import { Schema, model } from "mongoose";

const paperSchema = Schema({
  year: { type: String, required: true },
  date: Date,
  subject_code: { type: String, required: true },
  subject: { type: String, required: true },
  total_marks: Number,
  duration: Number,
  available_weightages: { type: Number, enum: [3, 4, 5], default: 4 },
  file_url: { type: String, required: true },
  accepted: {
    type: Boolean,
    default: false,
  },
  setter: {
    name: String,
    id: String,
  },
});

export default model("paper", paperSchema);
