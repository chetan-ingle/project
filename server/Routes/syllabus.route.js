import express from "express";
import syllabusModel from "../model/syllabus.model.js";
import fs from "fs";
import { exec } from "child_process";
const SyllabusRouter = express.Router();
let path = 'C:\Users\pubgi\Desktop\finalyrpr';

// exec("pwd", (_, dir) => {(path = dir); console.log(_)});

SyllabusRouter.post("/create", async (req, res) => {
  const { type, by, name: desc, subject } = req.body;
  const { size, mimetype, name } = req.files.file;
  const filename = `${name}.${mimetype.split("/")[1]}`;
  req.files.file.mv(`C:\\Users\\pubgi\\Desktop\\finalyrpr\\server\\static\\${filename}`, (error) => {
    console.log(error, path);
  });
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
      .json({ data: akg, message: "Fail to load materials.", success: false });
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
