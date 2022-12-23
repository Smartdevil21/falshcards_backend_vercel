import mongoose, { model } from "mongoose";

const listSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  listName: {
    type: String,
    required: true,
  },
  listItems: [{ type: String }],
});

export const Lists = mongoose.models.list || mongoose.model("list", listSchema);
