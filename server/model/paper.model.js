import { Schema, model } from "mongoose";

const paperSchema = Schema({
  year: { type: String, required: true, default: 0 },
  date: { type: Date, default: Date.now() },
  subject: { name: String, code: String },
  total_marks: Number,
  duration: Number,

  file_url: { type: String, required: true },
  status: {
    accepted: {
      type: Boolean,
      default: false,
    },
    time: {
      type: Date,
      required: true,
      default:"00",
    },
    allow_before: {
      type: Number,
      default: 0,
    },
  },

  setter: {
    name: String,
    id: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true,
    },
  },
});

export default model("paper", paperSchema);
