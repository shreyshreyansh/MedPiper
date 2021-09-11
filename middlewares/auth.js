const User = require("./../models/user");

let auth = (req, res, next) => {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) console.log(err);
    else if (!user) res.redirect("/loginPage");
    else {
      req.token = token;
      req.user = user;
      next();
    }
  });
};

module.exports = { auth };
