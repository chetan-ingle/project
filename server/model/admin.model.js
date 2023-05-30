import { Schema, model } from "mongoose";

const AdminSchema = Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "admin" },
});

export default model("admin", AdminSchema);
