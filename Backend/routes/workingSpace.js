const express = require("express");
const {
  createWorkingSpace,
  getWorkingSpace,
  getAllWorkingSpace,
  updateWorkingSpace,
  deleteWorkingSpace,
  checkAvailableSeat,
} = require("../controllers/workingspace");

// Include other resource routers
const reservationRouter = require("./reservation");

const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:workingSpaceId/reservation/", reservationRouter);

router
  .route("/")
  .get(getAllWorkingSpace)
  .post(protect, authorize("admin", "moderator"), createWorkingSpace);
router
  .route("/:id")
  .get(getWorkingSpace)
  .put(protect, authorize("admin", "moderator"), updateWorkingSpace)
  .delete(protect, authorize("admin", "moderator"), deleteWorkingSpace);
router
  .route("/available/:id")
  .post(checkAvailableSeat);
  
module.exports = router;



/**
 * @swagger
 * components:
 *   schemas:
 *     WorkingSpace:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - tel
 *         - openTime
 *         - closeTime
 *         - maxSeat
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the working space.
 *           maxLength: 50
 *         address:
 *           type: string
 *           description: The address of the working space.
 *         tel:
 *           type: string
 *           description: The telephone number of the working space (10-digit format).
 *         openTime:
 *           type: string
 *           format: date-time
 *           description: The opening time of the working space.
 *         closeTime:
 *           type: string
 *           format: date-time
 *           description: The closing time of the working space.
 *         maxSeat:
 *           type: integer
 *           description: The maximum number of seats available in the working space.
 *           default: 20
 *         image:
 *           type: string
 *           description: The URL of the image associated with the working space (optional).
 *       example:
 *         name: "Example Working Space"
 *         address: "123 Main St, City"
 *         tel: "1234567890"
 *         openTime: "2024-04-30T09:00:00Z"
 *         closeTime: "2024-04-30T18:00:00Z"
 *         maxSeat: 20
 */



/**
 * @swagger
 * /workingspace:
 *   get:
 *     summary: Retrieve all working spaces
 *     description: Retrieve a list of all working spaces.
 *     security:
 *       - bearerAuth: []  # Requires authentication via JWT token
 *     responses:
 *       200:
 *         description: A list of working spaces.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkingSpace'
 *       500:
 *         description: Internal server error.

 *   post:
 *     summary: Create a new working space
 *     description: Create a new working space with the provided details.
 *     security:
 *       - bearerAuth: []  # Requires authentication via JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkingSpace'
 *     responses:
 *       '201':
 *         description: New working space created successfully
 *       '401':
 *         description: Unauthorized - Missing or invalid JWT token

 * /workingspace/{id}:
 *   put:
 *     summary: Update a working space by ID
 *     description: Update an existing working space using its ID.
 *     security:
 *       - bearerAuth: []  # Requires authentication via JWT token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the working space to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkingSpace'
 *     responses:
 *       '200':
 *         description: Working space updated successfully
 *       '401':
 *         description: Unauthorized - Missing or invalid JWT token

 *   delete:
 *     summary: Delete a working space by ID
 *     description: Delete an existing working space using its ID.
 *     security:
 *       - bearerAuth: []  # Requires authentication via JWT token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the working space to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Working space deleted successfully
 *       '401':
 *         description: Unauthorized - Missing or invalid JWT token
 */

/**
 * @swagger
 * /workingspace/available/{id}:
 *   post:
 *     summary: Check available seats for a working space within a time range
 *     description: Retrieve the number of available seats for a specific working space during the specified time period.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the working space to check
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: Start and end time for seat availability check
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             startTime:
 *               type: string
 *               format: date-time
 *               description: Start time for the availability check (ISO 8601 date-time format)
 *             endTime:
 *               type: string
 *               format: date-time
 *               description: End time for the availability check (ISO 8601 date-time format)
 *     responses:
 *       200:
 *         description: Number of available seats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
 *                   example: true
 *                 availableSeats:
 *                   type: integer
 *                   description: Number of available seats during the specified time period
 *                   example: 15
 *       400:
 *         description: Invalid request or working space not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Details about the error or failure reason
 *                   example: Working space not found
 */

exports.checkAvailableSeat = async (req, res, next) => {
  try {
    const { startTime, endTime } = req.body;
    const workingSpaceId = req.params.id;

    // Retrieve the available seats
    const availableSeats = await getAvailableSeat(workingSpaceId, startTime, endTime);

    res.status(200).json({
      success: true,
      availableSeats: availableSeats,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
