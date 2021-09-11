const User = require("../../models/user");
module.exports = (req, res) => {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) {
      res.redirect("/loginPage?error=" + encodeURIComponent("Login_Failed"));
    } else {
      if (user) {
        res.redirect("/home");
      } else {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (!user) {
            res.redirect(
              "/loginPage?error=" + encodeURIComponent("User_Not_Registered")
            );
          } else {
            user.comparepassword(req.body.password, (err, isMatch) => {
              if (!isMatch) {
                res.redirect(
                  "/loginPage?error=" + encodeURIComponent("Password_Incorrect")
                );
              } else {
                user.generateToken((err, user) => {
                  res.cookie("auth", user.token);
                  res.redirect("/home");
                });
              }
            });
          }
        });
      }
    }
  });
};
