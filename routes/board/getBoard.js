const Board = require("../../models/board");
module.exports = (req, res) => {
  Board.findOne(
    { _id: req.body.boardID, userID: req.user._id },
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
