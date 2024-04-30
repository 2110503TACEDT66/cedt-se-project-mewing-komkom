const express = require("express");
const { banUser, unbanUser } = require("../controllers/user");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /user/ban/{id}:
 *   put:
 *     summary: Ban a user
 *     description: Bans a user by setting their 'banUntil' and 'banReason' properties.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to ban
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               banUntil:
 *                 type: string
 *                 format: date-time
 *                 description: Date until which the user is banned
 *               banReason:
 *                 type: string
 *                 description: Reason for banning the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User banned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the user was banned successfully.
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request - Invalid ban date or attempting to ban admin/moderator
 *       404:
 *         description: User not found
 */

router.put("/ban/:id", protect, authorize("admin", "moderator"), banUser);

/**
 * @swagger
 * /user/unban/{id}:
 *   put:
 *     summary: Unban a user
 *     description: Removes the ban on a user by setting 'banUntil' to null.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to unban
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User unbanned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the user was unbanned successfully.
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */

router.put("/unban/:id", protect, authorize("admin", "moderator"), unbanUser);

module.exports = router;
