import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    subject: String,
    description: String,
    email: String,
    name: String,
    to: String,
  },
  {
    timestamps: true,
  }
);

export default model("notification", notificationSchema);