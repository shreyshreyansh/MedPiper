const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const multer = require("multer");
const User = require("./models/user");
const Board = require("./models/board");
const { auth } = require("./middlewares/auth");
const board = require("./models/board");
const { loader1, loader2 } = require("./functions/loader");
const db = require("./config/config").get(process.env.NODE_ENV);
const salt = 10;
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);
  else cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

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

app.get("/", function (req, res) {
  res.status(200).send(`Welcome to Medpiper backend task api service`);
});

// adding new user (sign-up route)
app.post("/api/register", upload.single("image"), function (req, res) {
  // taking a user
  const newuser = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    password2: req.body.password2,
    image: req.file.path,
  });

  if (newuser.password != newuser.password2)
    return res.status(400).json({ message: "password not match" });

  User.findOne({ email: newuser.email }, function (err, user) {
    if (user)
      return res.status(400).json({ auth: false, message: "email exits" });

    newuser.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false });
      }
      res.status(200).json({
        succes: true,
        user: doc,
      });
    });
  });
});

// login user
app.post("/api/login", function (req, res) {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) return res(err);
    if (user)
      return res.status(400).json({
        error: true,
        message: "You are already logged in",
      });
    else {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (!user)
          return res.json({
            isAuth: false,
            message: "Auth failed ,email not found",
          });

        user.comparepassword(req.body.password, (err, isMatch) => {
          if (!isMatch)
            return res.json({
              isAuth: false,
              message: "Password doesn't match",
            });

          user.generateToken((err, user) => {
            if (err) {
              console.log(err);
              return res.status(400).send(err);
            }
            res.cookie("auth", user.token).json({
              isAuth: true,
              id: user._id,
              email: user.email,
            });
          });
        });
      });
    }
  });
});

app.post("/api/updateUser", auth, upload.single("image"), function (req, res) {
  if (
    !req.user._id ||
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.password ||
    !req.body.password2 ||
    req.body.password !== req.body.password2
  ) {
    return res.status(400).json({ success: false });
  }
  bcrypt.genSalt(salt, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) return next(err);
      User.updateOne(
        { _id: req.user._id },
        {
          $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hash,
            password2: hash,
            image: req.file.path,
          },
        },
        { new: true },
        function (err, user) {
          if (err) {
            return res.status(400).json({ success: false });
          }
          res.status(200).json({
            succes: true,
            user: user,
          });
        }
      );
    });
  });
});

//logout user
app.get("/api/logout", auth, function (req, res) {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

// get logged in user
app.get("/api/profile", auth, function (req, res) {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.firstname + req.user.lastname,
  });
});

app.post("/api/createBoard", auth, function (req, res) {
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
    board.create(newBoard, function (err, result) {
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
});

app.get("/api/getAllBoard", auth, function (req, res) {
  board.find({ userID: req.user._id }, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      succes: true,
      boards: result,
    });
  });
});

app.post("/api/getBoard", auth, function (req, res) {
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
});

app.post("/api/addTask", auth, function (req, res) {
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
});

app.post("/api/updateTask", auth, function (req, res) {
  Board.update(
    {
      _id: req.body.boardID,
      userID: req.user._id,
      "list._id": req.body.taskID,
    },
    {
      $set: {
        "list.$.task": req.body.task,
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
});

app.post("/api/deleteTask", auth, function (req, res) {
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
});

// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("...MEDPIPER BACKEND TEST...");
  loader1(`App is running on Port ${PORT}`, 2000);
});
