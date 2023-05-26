import express, { Router } from "express";
import subjectModel from "../model/subject.model.js";
const SubjectRouter = Router();

SubjectRouter.get("/", async (req, res) => {
  try {
    const data = await subjectModel.find({}, { _id: 0 }); //.select("-_id");
    res.status(200).json({ error: true, message: "Subject fetched .", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Something went wrong." });
  }
});

SubjectRouter.get("/:id", async (req, res) => {
  try {
    const data = await subjectModel.find({ code: req.params.id });
    res.status(200).json({ error: true, message: "Subject fetched .", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Something went wrong." });
  }
});
export default SubjectRouter;
