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
      return res.json({
        status: "failure",
        message: `User with the User Id ${req.user._id}, does not exists!`,
      });
    }
    Board.create(newBoard, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false });
      }
      res.status(200).json({
        succes: true,
        board: result,
      });
    });
  });
};
