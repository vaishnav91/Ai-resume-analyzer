const express = require("express");
const {
  register,
  login,
  getAdminStats,
} = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/admin/stats", protect, adminOnly, getAdminStats);

module.exports = router;
