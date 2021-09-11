module.exports = (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    image: req.user.image,
  });
};
