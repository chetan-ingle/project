import { Schema, model } from "mongoose";

const AppSchema = Schema(
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
    college_id: String,
    previousWork: [String],
  },
  {
    timeStamps: true,
  }
);

export default model("application", AppSchema);
