import { Schema, model } from "mongoose";

const examinerSchema = Schema(
  {
    name: String,
    institute: String,
    institute_id: String,
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    institute_address: String,
    isVerified: { type: Boolean, default: true },
    profile: String,
    password: String,
    subjects: [{ name: String, code: String }],
    role: {
      type: String,
      default: "examiner",
    },
  },
  {
    timeStamps: true,
  }
);

export default model("examiner", examinerSchema);
