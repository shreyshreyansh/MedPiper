const Board = require("../../models/board");
module.exports = (req, res) => {
  Board.findOneAndUpdate(
    { _id: req.body.boardID, userID: req.user._id },
    { $pull: { list: { _id: req.body.taskID } } },
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
