import MoodBoardEntry from "../models/MoodBoardEntry.js";

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
    image: req.file.path, 
  });

  const createdEntry = await entry.save();
  res.status(201).json(createdEntry);
};

export const getEntries = async (req, res) => {
  const entries = await MoodBoardEntry.find({})
    .populate("user", "name") 
    .sort({ createdAt: -1 }); 
  res.json(entries);
};
