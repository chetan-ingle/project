import { Schema, model } from "mongoose";

const uniqString = {
  type: String,
  unique: true,
};
const moderatorSchema = new Schema(
  {
    name: String,
    experience: Number,
    qualification: String,
    institute: String,
    subject: [{ name: String, code: String }],
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
    },
    address: String,
    profile: String,
    password: String,
    previousWork: [String],
    role: {
      type: String,
      default: "moderator",
    },
  },
  {
    timestamps: true,
  }
);

export default model("moderator", moderatorSchema);
