import { Schema, model } from "mongoose";

const examinerSchema = Schema(
  {
    name: String,
    institute: String,
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    address: String,
    isVerified: Boolean,
    profile: String,
    userid: String,
    password: String,
  },
  {
    timeStamps: true,
  }
);

export default model("moderator", examinerSchema);
