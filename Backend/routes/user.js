const express = require("express");
const { unbanUser } = require("../controllers/user");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router
  .route("/unban")
  .put(protect, authorize("admin", "moderator"), unbanUser);

module.exports = router;