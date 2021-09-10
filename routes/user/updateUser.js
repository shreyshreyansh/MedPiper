const User = require("../../models/user");
const bcrypt = require("bcrypt");
const salt = 10;
module.exports = (req, res) => {
  if (
    !req.user._id ||
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.password ||
    !req.body.password2 ||
    req.body.password !== req.body.password2
  ) {
    return res.status(400).json({ success: false });
  }
  bcrypt.genSalt(salt, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) return next(err);
      User.updateOne(
        { _id: req.user._id },
        {
          $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hash,
            password2: hash,
            image: req.file.path,
          },
        },
        { new: true },
        function (err, user) {
          if (err) {
            return res.status(400).json({ success: false });
          }
          res.status(200).json({
            succes: true,
            user: user,
          });
        }
      );
    });
  });
};
