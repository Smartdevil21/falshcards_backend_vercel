import mongoose, { model, Schema } from "mongoose";

const feedbackSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export const Feedback =
  mongoose.models.feedback || mongoose.model("feedback", feedbackSchema);
