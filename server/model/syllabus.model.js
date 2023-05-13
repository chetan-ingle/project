import mongoose, { Schema, model } from "mongoose";

const sySchema = new Schema({
  subject: String,
  file: String,
  type: String,
  size: Number,
  by: String,
  desc: String,
});

export default mongoose.models.syllabus || model("syllabus", sySchema);
