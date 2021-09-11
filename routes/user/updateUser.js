const User = require("../../models/user");
const bcrypt = require("bcrypt");
const salt = 10;
module.exports = (req, res) => {
  if (req.body.password) {
    if (req.body.password === req.body.password2) {
      bcrypt.genSalt(salt, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          if (err) return next(err);
          User.updateOne(
            { _id: req.user._id },
            {
              $set: {
                password: hash,
                password2: hash,
              },
            },
            { new: true },
            function (err, user) {
              if (err) {
                return res.status(400).json({ success: false });
              }
            }
          );
        });
      });
    }
  }
  if (req.body.firstname) {
    User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          firstname: req.body.firstname,
        },
      },
      { new: true },
      function (err, user) {
        if (err) {
          return res.status(400).json({ success: false });
        }
      }
    );
  }
  if (req.body.lastname) {
    User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          lastname: req.body.lastname,
        },
      },
      { new: true },
      function (err, user) {
        if (err) {
          return res.status(400).json({ success: false });
        }
      }
    );
  }
  if (req.file) {
    User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          image: req.file.path,
        },
      },
      { new: true },
      function (err, user) {
        if (err) {
          return res.status(400).json({ success: false });
        }
      }
    );
  }
  res.redirect("/home");
};
