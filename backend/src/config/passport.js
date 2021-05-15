const User = require("../models/User");
const { Strategy } = require("passport-local");

module.exports = function (passport) {
  passport.use(
    new Strategy(
      {
        usernameField: "email",
        passwordField: "password",
      },

      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user)
            return done(null, false, {
              message: "Wrong email",
            });

          const match = await User.comparePasswords(password, user.password);
          if (!match)
            return done(null, false, {
              message: "Wrong password",
            });

          return done(null, user, {
            message: "Successfuly authentication",
            email: user.email,
          });
        } catch (error) {
          return done(error, false, {
            message: "Authentication error",
          });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ _id: id });

      if (user) {
        delete user.password;
        const userInfo = { id: user._id, email: user.email };
        return done(null, userInfo);
      }

      return done(null, false, { message: "Deserialize fail" });
    } catch (error) {
      console.log(error);
      return done(error, false, { message: "Deserialize error" });
    }
  });
};
