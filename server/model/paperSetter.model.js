import { Schema, model } from "mongoose";

const setterSchema = Schema(
  {
    name: String,
    experience: Number,
    qualification: String,
    institute: String,
    subject: {
      name: String,
      code: String,
    },
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
    role: {
      type: String,
      default: "setter",
    },
  },
  {
    timeStamps: true,
  }
);

export default model("paper-setter", setterSchema);
