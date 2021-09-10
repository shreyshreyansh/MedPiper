module.exports = (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.firstname + " " + req.user.lastname,
    image: req.user.image,
  });
};
