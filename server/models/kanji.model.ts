import mongoose, { Schema } from "mongoose";

const kanjiSchema: Schema = new mongoose.Schema({
  word: {
    type: String,
    unique: true,
  },
  meaning: String,
  on_reading: {
    reading: String,
    example: {
      eg: String,
      meaning: String,
      pronounciation: String,
    },
  },
  kun_reading: {
    reading: String,
    example: {
      eg: String,
      meaning: String,
      pronounciation: String,
    },
  },
  level: Number,
});

export const Kanjis =
  mongoose.models.kanji || mongoose.model("kanji", kanjiSchema);
