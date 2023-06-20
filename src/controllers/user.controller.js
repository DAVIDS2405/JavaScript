const User = require("../models/User");
const passport = require("passport");

const renderRegisterForm = (req, res) => {
  res.render("user/registerForm");
};

const registerNewUser = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  if (Object.values(req.body).includes(""))
    return res.send("Lo sentimos, debes llenar todos los campos");

  if (password != confirmpassword)
    return res.send("Lo sentimos, los passwords no coinciden");

  const userBDD = await User.findOne({ email });
  if (userBDD)
    return res.send("Lo sentimos, el email ya se encuentra registrado");
  const newUser = await new User({ name, email, password, confirmpassword });
  newUser.password = await newUser.encrypPassword(password);
  newUser.save();
  res.redirect("/user/login");
};

const renderLoginForm = (req, res) => {
  res.render("user/loginForm");
};

const loginUser = passport.authenticate("local", {
  failureRedirect: "/user/login",
  successRedirect: "/portafolios",
});

const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) return res.send("Ocurrio un error");
    res.redirect("/");
  });
};

module.exports = {
  renderRegisterForm,
  registerNewUser,
  renderLoginForm,
  loginUser,
  logoutUser,
};
