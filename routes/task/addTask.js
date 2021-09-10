const Board = require("../../models/board");
module.exports = (req, res) => {
  const newTask = {
    task: req.body.task,
    status: req.body.status,
  };
  Board.findOneAndUpdate(
    { _id: req.body.boardID, userID: req.user._id },
    { $push: { list: newTask } },
    { new: true },
    function (err, board) {
      if (err) {
        return res.status(400).json({ success: false });
      }
      res.status(200).json({
        succes: true,
        board: board,
      });
    }
  );
};
