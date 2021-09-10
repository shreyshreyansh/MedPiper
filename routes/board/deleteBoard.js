const board = require("../../models/board");
module.exports = (req, res) => {
  board.findOneAndRemove(
    { _id: req.body.boardID, userID: req.user._id },
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false });
      }
      res.status(200).json({
        succes: true,
        board: result,
      });
    }
  );
};
