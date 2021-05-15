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
      message: `${savedUser.email} was successfuly registered`,
    });
  } catch (error) {
    return res.json({
      message: "Error creating user. Try again",
      error,
    });
  }
};

// login
userController.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) return res.json({ info });

    req.logIn(user, (err) => {
      if (err) throw err;

      res.json({ info });
    });
  })(req, res, next);
};

// logout
userController.logout = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      req.logout();
      return res.json({ message: "See you soon" });
    }

    return res.json({ message: "You are not logged" });
  } catch (error) {
    res.json({ message: "Logout error", error });
  }
};

// verify cookie
userController.checkCookieUser = async (req, res, next) => {
  if (req.user && req.isAuthenticated())
    return res.json({
      message: `${req.user.email} is logged in`,
      logged: true,
      email: req.user.email,
    });

  return res.json({ message: "No user logged", logged: false, email: null });
};

// export
module.exports = userController;
