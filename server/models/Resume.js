const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: String,
    filePath: String,
    extractedText: String,
    score: Number,
    strengths: [String],
    weaknesses: [String],
    suggestions: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
