const Reservation = require("../models/Reservation");
const WorkingSpace = require("../models/WorkingSpace");
const ReservasionLog = require("../models/ReservasionLog");

exports.getAllReservation = async (req, res, next) => {
  let query;

  // General users can see only their reservation
  if (req.user.role !== "admin" && req.user.role !== "moderator") {
    query = Reservation.find({ user: req.user.id })
      .populate({
        path: "workingSpace",
        select: "name address tel",
      })
      .populate({
        path: "user",
        select: "name email",
      });
  } else {
    // if you are an admin, u can see it all
    if (req.params.workingSpaceId) {
      console.log(req.params.workingSpaceId);

      query = Reservation.find({
        workingSpace: req.params.workingSpaceId,
      })
        .populate({
          path: "workingSpace",
          select: "name address tel",
        })
        .populate({
          path: "user",
          select: "name email",
        });
    } else {
      query = Reservation.find()
        .populate({
          path: "workingSpace",
          select: "name address tel",
        })
        .populate({
          path: "user",
          select: "name email",
        });
    }
  }

  try {
    const reservation = await query;

    res.status(200).json({
      success: true,
      count: reservation.length,
      data: reservation,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Appointment" });
  }
};

exports.getReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate({
      path: "workingSpace",
      select: "name description tel",
    });

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}1`,
      });
    }
    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find reservation" });
  }
};

exports.addReservation = async (req, res, next) => {
  try {
    if (!req.body.startTime) {
      return res.status(400).json({
        success: false,
        message: `User does not provided start time`,
      });
    }
    if (!req.body.endTime) {
      return res.status(400).json({
        success: false,
        message: `User does not provided end time`,
      });
    }
    if (req.body.endTime <= req.body.startTime) {
      return res.status(400).json({
        success: false,
        message: `Invalid end time`,
      });
    }
    req.body.workingSpace = req.params.workingSpaceId;

    const workingspace = await WorkingSpace.findById(req.params.workingSpaceId);
    if (!workingspace) {
      return res.status(404).json({
        success: false,
        message: `No working space with the id of ${req.params.workingSpaceId}`,
      });
    }

    // add user Id to req.body
    req.body.user = req.user.id;
    // Check for existed reservation
    const existedReservation = await Reservation.find({ user: req.user.id });
    //If the user is not an admin, they can only create 3 reservation.
    if (
      existedReservation.length >= 3 &&
      req.user.role !== "admin" &&
      req.user.role !== "moderator"
    ) {
      return res.status(400).json({
        success: false,
        message: `The user with ID ${req.user.id} has already made 3 reservations`,
      });
    }
    const reservation = await Reservation.create(req.body);
    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot create Reservation" });
  }
};

exports.updateReservation = async (req, res, next) => {
  try {
    let reservation = await Reservation.findById(req.params.id)
      .populate({
        path: "workingSpace",
        select: "name",
      })
      .populate({ path: "user", select: "name" });
    console.log(reservation);
    console.log(typeof reservation);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`,
      });
    }

    //Make sure user is the reservation owner
    if (
      reservation.user.toString() !== req.user.id &&
      req.user.role !== "admin" &&
      req.user.role !== "moderator"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this reservation`,
      });
    }
    // Log the edit reservation
    if (
      req.body.startTime !== reservation.startTime ||
      req.body.endTime !== reservation.endTime
    )
      await addEditReservationLog(
        req.params.id,
        reservation.startTime,
        req.body.startTime,
        reservation.endTime,
        req.body.endTime,
        reservation.toJSON()
      );
    reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot update Reservation" });
  }
};

exports.deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate({
        path: "workingSpace",
        select: "name",
      })
      .populate({ path: "user", select: "name" });
    console.log(typeof reservation);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`,
      });
    }

    // Make sure user is the reservation owner
    if (
      reservation.user.toString() !== req.user.id &&
      req.user.role !== "admin" &&
      req.user.role !== "moderator"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this reservation`,
      });
    }
    if (
      (req.user.role === "admin" || req.user.role === "moderator") &&
      req.user.id !== reservation.user.toString()
    ) {
      // Log the Forced Cancel reservation
      await addCancelReservationLog(req.params.id, reservation.toJSON(), true);
    } else {
      // Log the cancel reservation
      await addCancelReservationLog(req.params.id, reservation.toJSON());
    }
    await reservation.deleteOne();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete Reservation" });
  }
};

exports.clearSpace = async (req, res, next) => {
  try {
    const workingspace = await WorkingSpace.findById(req.params.id);

    if (!workingspace) {
      return res.status(400).json({
        success: false,
        message: `No working space with the id of ${req.params.id}1`,
      });
    }

    const clearReservations = await Reservation.deleteMany({
      workingSpace: req.params.id,
    });

    return res
      .status(200)
      .json({ success: true, message: "This working space is cleared" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete Reservation" });
  }
};

exports.getUserReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.find({ user: req.user.id }).populate({
      path: "workingSpace",
      select: "name description tel",
    });

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}1`,
      });
    }
    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find reservation" });
  }
};

// Function to add reservation log for editing
const addEditReservationLog = async (
  reservationId,
  beforeEditStartTime,
  afterEditStartTime,
  beforeEditEndTime,
  afterEditEndTime,
  editedReservation
) => {
  const reservationLog = await ReservasionLog.create({
    reservationId,
    action: "edit",
    beforeEditStartTime,
    afterEditStartTime,
    beforeEditEndTime,
    afterEditEndTime,
    reservationOrigin: editedReservation,
  });
  // return { success: true, message: 'Edit Reservation Log added successfully', data: reservationLog };
};

// Function to add reservation log for cancellation
const addCancelReservationLog = async (
  reservationId,
  canceledReservation,
  forced = false
) => {
  const reservationLog = await ReservasionLog.create({
    reservationId,
    action: forced ? "forceCancel" : "cancel",
    reservationOrigin:canceledReservation,
  });
  // return { success: true, message: 'Cancel Reservation Log added successfully', data: reservationLog };
};

exports.getLogReservation = async (req, res, next) => {
  let query;

  // General users can see only their reservation
  if (req.user.role !== "admin" && req.user.role !== "moderator") {
    query = ReservasionLog.find({ user: req.user.id });
  } else {
    // if you are an admin, u can see it all
    query = ReservasionLog.find();
  }

  try {
    const reservationLog = await query;

    res.status(200).json({
      success: true,
      data: reservationLog,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot find Log Appointment" });
  }
};
