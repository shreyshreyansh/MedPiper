const Board = require("../../models/board");
module.exports = (req, res) => {
  Board.updateOne(
    {
      _id: req.body.boardID,
      userID: req.user._id,
      "list._id": req.body.taskID,
    },
    {
      $set: {
        "list.$.status": req.body.status,
      },
    },
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
