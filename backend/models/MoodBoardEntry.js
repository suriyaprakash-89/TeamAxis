import mongoose from "mongoose";

const moodBoardEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: String, required: true },
    summary: { type: String, required: true, maxlength: 280 },
  },
  { timestamps: true }
);

const MoodBoardEntry = mongoose.model("MoodBoardEntry", moodBoardEntrySchema);
export default MoodBoardEntry;
