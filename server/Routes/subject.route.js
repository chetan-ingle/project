import express, { Router } from "express";
import subjectModel from "../model/subject.model.js";
const SubjectRouter = Router();

SubjectRouter.get("/", async (req, res) => {
  try {
    const data = await subjectModel.find({}, { _id: 0 }); //.select("-_id");
    res.status(200).json({ error: false, message: "Subject fetched .", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Something went wrong." });
  }
});

SubjectRouter.get("/:id", async (req, res) => {
  try {
    const data = await subjectModel.find({ code: req.params.id });
    res.status(200).json({ error: false, message: "Subject fetched .", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Something went wrong." });
  }
});

SubjectRouter.get("/add/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const code = (name.slice(0, 2) + Math.random().toString(32).slice(3, 15)).toUpperCase();
    const data = await subjectModel.create({ name, code });
    res.status(200).json({ error: false, message: "Subject fetched .", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Something went wrong." });
  }
});

export default SubjectRouter;
