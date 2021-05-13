const User = require("../models/User");
const passport = require("passport");

const userController = {};

// create new user
userController.createUser = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email }, { _id: 1 });
    if (userFound)
      return res.json({
        success: false,
        message: "This email is already in use",
      });

    const newUser = new User({
      email: req.body.email,
      password: await User.encryptPassword(req.body.password),
    });
    const savedUser = await newUser.save();

    return res.json({
      success: true,
      message: `${savedUser.email} was successfuly registered`,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error creating user. Try again",
      error,
    });
  }
};

// login
userController.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) return res.json({ success: false, info });

    req.logIn(user, (err) => {
      if (err) throw err;

      res.json({ success: true, info });
    });
  })(req, res, next);
};

// logout
userController.logout = async (req, res) => {
  try {
    req.logout();
    res.json({ success: true, message: "See you soon" });
  } catch (error) {
    res.json({ success: false, message: "Logout error", error });
  }
};

module.exports = userController;
