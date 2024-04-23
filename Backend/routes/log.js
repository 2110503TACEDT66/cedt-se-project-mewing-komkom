const express = require("express");


const router = express.Router();

const { protect } = require("../middleware/auth");
const { addReservationLog } = require("../controllers/log");

router.route("/reservation").post(protect, addReservationLog);

module.exports = router;