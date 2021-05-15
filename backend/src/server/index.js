const cors = require("cors");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const userRoutes = require("../routes/user.routes");

const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.COOKIE_SECRET || "secret",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET || "secret"));

app.use(passport.initialize());
app.use(passport.session());
require("../config/passport")(passport);

// routes
app.use("/users", userRoutes);

// export
module.exports = app;
