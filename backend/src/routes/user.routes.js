const { Router } = require("express");
const passport = require("passport");
const {
  createUser,
  login,
  logout,
  checkCookieUser,
} = require("../controllers/user.controllers");

const router = Router();

router.post("/", createUser);
router.post("/auth", checkCookieUser);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
