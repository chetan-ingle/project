import express from "express";
import syllabusModel from "../model/syllabus.model.js";
const SyllabusRouter = express.Router();

SyllabusRouter.post("/create", async (req, res) => {
  const { file, id } = req.body;
  const payload = {};
  try {
    const akg = await syllabusModel.create(payload);
    if (!akg) {
      return res.status(400).json({ data: null, error: "No user found." });
    }
    return res
      .status(200)
      .json({ data: akg, message: "Sucess.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: "Something went wrong." });
  }
});

export default SyllabusRouter;
