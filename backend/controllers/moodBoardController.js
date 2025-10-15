import MoodBoardEntry from "../models/MoodBoardEntry.js";

// @desc    Create a new mood board entry
// @route   POST /api/moodboard
// @access  Private
export const createEntry = async (req, res) => {
  const { summary } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Image is required." });
  }
  if (!summary) {
    return res.status(400).json({ message: "Summary is required." });
  }

  const entry = new MoodBoardEntry({
    user: req.user._id,
    summary,
    image: req.file.path, // URL from multer-storage-cloudinary
  });

  const createdEntry = await entry.save();
  res.status(201).json(createdEntry);
};

// @desc    Get all mood board entries
// @route   GET /api/moodboard
// @access  Private
export const getEntries = async (req, res) => {
  const entries = await MoodBoardEntry.find({})
    .populate("user", "name") // Get the user's name
    .sort({ createdAt: -1 }); // Show newest first
  res.json(entries);
};
