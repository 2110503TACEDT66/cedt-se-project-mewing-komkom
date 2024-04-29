const express = require("express");
const {
  getAllReservation,
  addReservation,
  getReservation,
  updateReservation,
  deleteReservation,
  clearSpace,
  getUserReservation,
  getUserReservationQuota
} = require("../controllers/reservation");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(protect, getAllReservation)
  .post(protect, authorize("admin", "user", "moderator"), addReservation);
router
  .route("/:id")
  .get(protect, getReservation)
  .put(protect, authorize("admin", "user", "moderator"), updateReservation)
  .delete(protect, authorize("admin", "user", "moderator"), deleteReservation);
router
  .route("/user/:id")
  .get(protect, getUserReservation)

router.route("/clear/:id").delete(protect, authorize("admin", "moderator"), clearSpace);
router.route('/quota').post(protect, getUserReservationQuota);
module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: The start time of the reservation.
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: The end time of the reservation.
 *         user:
 *           $ref: '#/components/schemas/User'
 *         workingSpace:
 *           $ref: '#/components/schemas/WorkingSpace'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the reservation.
 *       example:
 *         startTime: "2024-04-30T09:00:35.700Z"
 *         endTime: "2024-04-30T12:00:35.700Z"
 *         user:
 *           _id: "661ec0afc560ea0ea4a43744"
 *           name: "thepbordin"
 *           email: "thepbordin@gmail.com"
 *           id: "661ec0afc560ea0ea4a43744"
 *         workingSpace:
 *           _id: "6621e0dd0ca3b59b54586983"
 *           name: "Chula Co-Working"
 *           address: "This is details"
 *           tel: "081530"
 *           id: "6621e0dd0ca3b59b54586983"
 *         createdAt: "2024-04-29T22:35:51.357Z"
 */

/**
 * @swagger
 * /reservation:
 *   get:
 *     summary: Retrieve all reservations
 *     description: Retrieve a list of all reservations.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of reservations.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                 count:
 *                   type: integer
 *                   description: The number of reservations returned.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reservation'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token

 *   post:
 *     summary: Create a new reservation
 *     description: Create a new reservation with the provided details.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: New reservation created successfully
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token

 * /reservation/{id}:
 *   put:
 *     summary: Update a reservation by ID
 *     description: Update an existing reservation using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the reservation to update
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token

 *   delete:
 *     summary: Delete a reservation by ID
 *     description: Delete an existing reservation using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the reservation to delete
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 */
