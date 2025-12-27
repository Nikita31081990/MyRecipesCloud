const express = require("express");
const router = express.Router();

const {
  login,
  registration,
  logout,
  getProfile,
} = require("../Controllers/userController");
const { authentication } = require("../middleware/authMiddleware");

router.post("/register", registration);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", authentication, getProfile);

module.exports = router;
