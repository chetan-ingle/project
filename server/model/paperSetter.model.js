import { Schema, model } from "mongoose";

const setterSchema = Schema(
  {
    name: String,
    experience: Number,
    qualification: String,
    institute: String,
    subject: String,
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    address: String,
    profile: String,
    userid: String,
    password: String,
    previousWork: [String],
  },
  {
    timeStamps: true,
  }
);

export default model("paper-setter", setterSchema);
