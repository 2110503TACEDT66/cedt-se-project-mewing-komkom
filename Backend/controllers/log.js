const ReservasionLog = require("../models/ReservasionLog");
exports.addReservationLog = async (req, res, next) => {

    try {
        if (!req.body.reservationId ) {
            return res.status(400).json({
                success: false,
                message: `Please provide all the reservationId fields`,
            });
        }
        if (req.body.action === "edit") {
            if (!req.body.beforeEditStartTime || !req.body.afterEditStartTime || !req.body.beforeEditEndTime || !req.body.afterEditEndTime) {
                return res.status(400).json({
                    success: false,
                    message: `Please provide all the required DateTime fields`,
                });
            }
        } else if (req.body.action === "cancel") {
            if (req.body.beforeEditStartTime || req.body.afterEditStartTime || req.body.beforeEditEndTime || req.body.afterEditEndTime) {
                return res.status(400).json({
                    success: false,
                    message: `Please provide only the canceled reservation`,
                });
            }
            if (!req.body.canceledReservation) {
                return res.status(400).json({
                    success: false,
                    message: `Please provide the canceled reservation`,
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: `Action ${req.body.action} is not valid`,
            });
        }
        // TODO:  Check if user is the owner of the reservation
        const reservationLog = await ReservasionLog.create(req.body);
        return res.status(200).json({
            success: true,
            data: reservationLog,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: `Cannot add Reservation Log ${err}`,
        });
    }
}

