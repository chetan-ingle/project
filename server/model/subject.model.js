import { Schema, model } from "mongoose";

const materialSchema = Schema({
  name: {
    type: String,
    unique: true,
  },
  url: String,
});

const prevPaperSchema = Schema({
  name: {
    type: String,
    unique: true,
  },
  year: String,
  url: String,
});

const subjectSchema = Schema({
  name: {
    type: String,
    unique: true,
  },
  code: {
    type: String,
    unique: true,
  },
});

export default model("subjects", subjectSchema);
