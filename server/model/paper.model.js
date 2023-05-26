import { Schema, model } from "mongoose";

const paperSchema = Schema({
  year: { type: String, required: true },
  date: Date,
  subject: [{ name: String, code: String }],
  total_marks: Number,
  duration: Number,
  
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
