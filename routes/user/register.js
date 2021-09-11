const User = require("../../models/user");
module.exports = (req, res) => {
  // taking a user
  if (!req.file) {
    res.redirect("/signupPage?error=" + encodeURIComponent("Image_Empty"));
  }
  const newuser = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    password2: req.body.password2,
    image: req.file.path,
  });

  if (newuser.password != newuser.password2) {
    res.redirect(
      "/signupPage?error=" + encodeURIComponent("Password_Mismatch")
    );
  } else {
    User.findOne({ email: newuser.email }, function (err, user) {
      if (user) {
        res.redirect("/signupPage?error=" + encodeURIComponent("User_Exists"));
      } else {
        newuser.save((err, doc) => {
          if (err) {
            console.log(err);
            res.redirect(
              "/signupPage?error=" + encodeURIComponent("Register_Failure")
            );
            return res.status(400).json({ success: false });
          }
          res.redirect("/loginPage");
        });
      }
    });
  }
};
