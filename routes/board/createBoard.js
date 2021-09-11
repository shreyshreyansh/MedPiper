const User = require("../../models/user");
const Board = require("../../models/board");
module.exports = (req, res) => {
  const newBoard = new Board({
    name: req.body.name,
    description: req.body.description,
    userID: req.user._id,
    list: [],
  });
  User.findOne({ _id: req.user._id }, function (err, user) {
    if (!user) {
      res.redirect("/home?error=" + encodeURIComponent("User_Not_Exists"));
    }
    Board.create(newBoard, function (err, result) {
      if (err) {
        res.redirect("/home?error=" + encodeURIComponent("Board_Not_Created"));
      } else res.redirect("/home");
    });
  });
};
