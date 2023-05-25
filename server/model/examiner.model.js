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
      unique: true,
    },
    institute_address: String,
    isVerified: Boolean,
    profile: String,
    password: String,
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
