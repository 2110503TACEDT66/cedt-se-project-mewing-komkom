const express = require("express");
const {
  register,
  login,
  getMe,
  logout,
  editUser,
  getAllUsers,
  deleteUser,
  getAllRoles,
} = require("../controllers/auth");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/logout", protect, logout);
router.put("/edit/:id", protect, authorize("moderator"), editUser);
router.get("/allusers", protect, authorize("admin", "moderator"), getAllUsers);
router.get("/allroles", protect, authorize("moderator"), getAllRoles);
router.delete("/deleleuser/:id", protect, authorize("moderator"), deleteUser);
module.exports = router;
