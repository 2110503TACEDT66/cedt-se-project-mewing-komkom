const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationLogSchema = new Schema({
    reservationId: {
    type: Schema.ObjectId,
        ref: "Reservation",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    action: {
        type: String,
        enum: ["edit", "cancel", "forceCancel"],
        required: true,
    },
    beforeEditStartTime: {
        type: Date,
    },
    afterEditStartTime: {
        type: Date
    },
    beforeEditEndTime: {
        type: Date,
    },
    afterEditEndTime: {
        type: Date
    },
    canceledReservation: {
        type: Object,
    }
});

module.exports = mongoose.model("ReservasionLog", ReservationLogSchema);