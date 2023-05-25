import mongoose, { Schema, model } from "mongoose";

const sySchema = new Schema({
  subject:  { type: String, required: true },
  url: String,
  mimetype: String,
  type: String,
  size: Number,
  by: { type: String, required: true },
  desc:  { type: String, required: true },
});

export default mongoose.models.syllabus || model("syllabus", sySchema);
