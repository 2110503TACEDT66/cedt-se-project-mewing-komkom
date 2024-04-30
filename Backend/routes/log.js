const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getLogReservation } = require("../controllers/reservation");

/**
 * @swagger
 * /log/reservation:
 *   get:
 *     summary: Retrieve reservation logs
 *     description: Retrieve a list of reservation logs.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of reservation logs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the reservation log.
 *                       reservationId:
 *                         type: string
 *                         description: The ID of the associated reservation.
 *                       action:
 *                         type: string
 *                         description: The type of action performed on the reservation (edit/cancel/forceCancel).
 *                       beforeEditStartTime:
 *                         type: string
 *                         format: date-time
 *                         description: The start time before editing (for edit actions).
 *                       afterEditStartTime:
 *                         type: string
 *                         format: date-time
 *                         description: The start time after editing (for edit actions).
 *                       beforeEditEndTime:
 *                         type: string
 *                         format: date-time
 *                         description: The end time before editing (for edit actions).
 *                       afterEditEndTime:
 *                         type: string
 *                         format: date-time
 *                         description: The end time after editing (for edit actions).
 *                       reservationOrigin:
 *                         $ref: '#/components/schemas/Reservation'
 *                         description: The original reservation details.
 *                       user:
 *                         type: string
 *                         description: The ID of the user performing the action.
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token
 *       500:
 *         description: Internal Server Error - Unable to retrieve reservation logs.
 */
router.route("/reservation").get(protect, getLogReservation);

module.exports = router;
