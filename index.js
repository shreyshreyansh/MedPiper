const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const upload = require("./functions/upload");
const { auth } = require("./middlewares/auth");
const { loader1, loader2 } = require("./functions/loader");
const db = require("./config/config").get(process.env.NODE_ENV);

const app = express();

// app use
app.use("/uploads", express.static("uploads"));
app.use(bodyparser.urlencoded({ extended: "false" }));
app.use(bodyparser.json());
app.use(cookieParser());

// database connection
mongoose.Promise = global.Promise;
mongoose.connect(
  db.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  function (err) {
    if (err) console.log(err);
    loader2(`Database is connected on Port 27017`, 5000);
  }
);

// user functions
const register = require("./routes/user/register");
const login = require("./routes/user/login");
const getUser = require("./routes/user/getUser");
const updateUser = require("./routes/user/updateUser");
const logout = require("./routes/user/logout");

// board functions
const createBoard = require("./routes/board/createBoard");
const getAllBoard = require("./routes/board/getAllBoard");
const getBoard = require("./routes/board/getBoard");
const deleteBoard = require("./routes/board/deleteBoard");

// task functions
const addTask = require("./routes/task/addTask");
const updateTask = require("./routes/task/updateTask");
const deleteTask = require("./routes/task/deleteTask");

// base
app.get("/api", function (req, res) {
  res
    .status(200)
    .json({ message: `Welcome to Medpiper backend task api service` });
});

// ============================USER APIS================================

// adding new user (sign-up route)
app.post("/api/register", upload.single("image"), function (req, res) {
  register(req, res);
});

// login user
app.post("/api/login", function (req, res) {
  login(req, res);
});

// get logged in user
app.get("/api/getUser", auth, function (req, res) {
  getUser(req, res);
});

// update the logged in user
app.post("/api/updateUser", auth, upload.single("image"), function (req, res) {
  updateUser(req, res);
});

// logout user
app.get("/api/logout", auth, function (req, res) {
  logout(req, res);
});

// ========================BOARD APIS==============================

// create logged in user's board
app.post("/api/createBoard", auth, function (req, res) {
  createBoard(req, res);
});

// get all the boards of the logged in user
app.get("/api/getAllBoard", auth, function (req, res) {
  getAllBoard(req, res);
});

// get a particular board of the logged in user
app.post("/api/getBoard", auth, function (req, res) {
  getBoard(req, res);
});

// delete a particular board of the logged in user
app.post("/api/deleteBoard", auth, function (req, res) {
  deleteBoard(req, res);
});

// ======================TODO TASK APIS===========================

// add a todo task on the logged in user board
app.post("/api/addTask", auth, function (req, res) {
  addTask(req, res);
});

// update the todo task on the logged in user board
app.post("/api/updateTask", auth, function (req, res) {
  updateTask(req, res);
});

app.post("/api/deleteTask", auth, function (req, res) {
  deleteTask(req, res);
});

// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("...MEDPIPER BACKEND TEST...");
  loader1(`App is running on Port ${PORT}`, 2000);
});
