import { Schema, model } from "mongoose";

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
