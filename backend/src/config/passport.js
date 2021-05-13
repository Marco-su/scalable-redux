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
          const userFound = await User.findOne({ email });
          if (!userFound) return done(null, false, { message: "Wrong email" });

          const match = await User.comparePasswords(
            password,
            userFound.password
          );
          if (!match) return done(null, false, { message: "Wrong password" });

          return done(null, userFound, {
            message: "Successfuly authentication",
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
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const foundUser = await User.findOne({ _id: id }, { _id: 1 });

      if (foundUser) {
        const userInfo = { id: foundUser._id };
        return done(null, userInfo);
      }

      return done(null, false, { message: "Deserialize fail" });
    } catch (error) {
      return done(error, false, { message: "Deserialize error" });
    }
  });
};
