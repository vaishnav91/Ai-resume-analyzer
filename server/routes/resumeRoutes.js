const express = require("express");
const {
  uploadResume,
  getUserResumes,
  getResumeById,
  reanalyzeResume,
  deleteResume,
} = require("../controllers/resumeController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../config/multerConfig");

const router = express.Router();

router.post("/upload", protect, upload.single("resume"), uploadResume);
router.get("/", protect, getUserResumes);
router.get("/:id", protect, getResumeById);
router.put("/:id/reanalyze", protect, reanalyzeResume);
router.delete("/:id", protect, deleteResume);

module.exports = router;
