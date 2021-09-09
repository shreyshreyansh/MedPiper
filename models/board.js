var mongoose = require("mongoose");
const confiq = require("../config/config").get(process.env.NODE_ENV);

const listSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
    maxlength: 500,
  },
  status: {
    type: String,
    enum: ["Todo", "Doing", "Done"],
    default: "Todo",
  },
});

const boardSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true,
    maxlength: 100,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  list: [listSchema],
});

boardSchema.pre("save", function (next) {
  next();
});

module.exports = mongoose.model("Board", boardSchema);
