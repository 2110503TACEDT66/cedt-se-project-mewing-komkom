const express = require("express");
const {
  register,
  login,
  getMe,
  logout,
  EditUser,
  getAllUser,
  deleteUser
} = require("../controllers/auth");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/logout", protect, logout);
router.put("/edit/:id", protect, authorize("moderator"), EditUser);
router.get("/alluser", protect, authorize("moderator"), getAllUser);
router.delete("/deleleuser/:id", protect, authorize("moderator"),deleteUser);
module.exports = router;
