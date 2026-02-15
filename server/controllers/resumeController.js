const { analyzeResume } = require("../services/openaiService");
const Resume = require("../models/Resume");
const pdfParse = require("pdf-parse");
const fs = require("fs");

// Upload and analyze resume
exports.uploadResume = async (req, res) => {
  try {
    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;

    const analysis = await analyzeResume(extractedText);

    const resume = await Resume.create({
      user: req.user?._id, // optional chaining for now
      fileName: req.file.filename,
      filePath,
      extractedText,
      score: analysis.score,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      suggestions: analysis.suggestions,
    });

    res.status(201).json({
      message: "Resume analyzed successfully",
      resume,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get all resumes
exports.getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single resume
exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Re-analyze resume
exports.reanalyzeResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const analysis = await analyzeResume(resume.extractedText);

    resume.score = analysis.score;
    resume.strengths = analysis.strengths;
    resume.weaknesses = analysis.weaknesses;
    resume.suggestions = analysis.suggestions;

    await resume.save();

    res.json({ message: "Resume re-analyzed", resume });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete resume
exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (fs.existsSync(resume.filePath)) {
      fs.unlinkSync(resume.filePath);
    }

    await resume.deleteOne();

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
