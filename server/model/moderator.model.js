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
    subject: [String],
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
    password: String,
    previousWork: [String],
  },
  {
    timestamps: true,
  }
);

export default model("moderator", moderatorSchema);
