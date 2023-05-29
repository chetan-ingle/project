import express from "express";
import syllabusModel from "../model/syllabus.model.js";
import fs from "fs";
import { ostype, path } from "../utils/os.js";
const SyllabusRouter = express.Router();

SyllabusRouter.post("/create", async (req, res) => {
  const { type, by, name: desc, subject } = req.body;
  if(!req.files) return res.status(400).json({data: null, error: true, message: "No file found."})
  const { size, mimetype, name } = req.files.file;
  const filename = `${name}.${mimetype.split("/")[1]}`;
  req.files.file.mv(
    ostype === "Linux"
      ? path.trim() + "/" + filename
      : `C:\\Users\\pubgi\\Desktop\\finalyrpr\\server\\static\\${filename}`,
    (error) => {
      console.log(error, path);
    }
  );
  const payload = {
    type,
    desc,
    size,
    subject,
    mimetype,
    url: filename,
    by,
  };
  try {
    const akg = await syllabusModel.create(payload);
    if (!akg) {
      return res.status(400).json({ data: payload, error: "No user found." });
    }
    return res
      .status(200)
      .json({ data: akg, message: "Success.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: "Something went wrong." });
  }
});

SyllabusRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await syllabusModel.find({
      by: id,
    });
    return res.status(200).json({ data, message: "Success.", success: true });
  } catch (error) {
    return res
      .status(400)
      .json({ data: null, message: "Fail to load materials.", success: false });
  }
});

SyllabusRouter.get("/subject/:subject", async (req, res) => {
  const { subject } = req.params;

  try {
    const data = await syllabusModel.find({
      subject,
    });
    return res.status(200).json({ data, message: "Success.", success: true });
  } catch (error) {
    return res
      .status(400)
      .json({ data: null, message: "Fail to load materials.", success: false });
  }
});

SyllabusRouter.post("/delete/:material_id", async (req, res) => {
  const { material_id } = req.params;
  try {
    const data = await syllabusModel.findOneAndDelete({
      _id: material_id,
    });
    // removing file from server if exists
    if (fs.existsSync(`${path.trim()}/static/${data.url}`)) {
      fs.unlinkSync(`${path.trim()}/static/${data.url}`);
    }

    return res.status(200).json({ message: "Success.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Fail to delete materials.",
      success: false,
    });
  }
});
export default SyllabusRouter;
