const User = require("../models/User");

exports.unbanUser = async (req, res, next) => {
    try {
      let user = await User.findById(req.body.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `No user with the id of ${req.body.userId}`,
        });
      }

      user = await User.findByIdAndUpdate(req.body.userId, { banUntil: null }, {
        new: true,
        runValidators: true,
      });
  
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Cannot unban user" });
    }
};