import { Router } from "express";
import paperModel from "../model/paper.model.js";

const paper_router = Router();

// get papers by id(moderator id)
paper_router.get("/:subject", async (req, res) => {
  const { subject } = req.params;
  try {
    const data = await paperModel.find({
      "subject.code": subject,
    });
    return res.status(200).json({ data, message: "Success.", success: true });
  } catch (error) {
    return res
      .status(400)
      .json({ data: null, message: "Fail to load q-papers.", success: false });
  }
});

// post paper- route for setters
paper_router.post("/create", async (req, res) => {
  await paperModel.insertMany([
    {
      year: 3,
      setter: {
        name: "Aniket Tote",
        id: "6465c0445b9ab09efc0b163c",
      },
      date: new Date(),
      subject: {
        name: "Compiler Design",
        code: "COC0J5IL96DCE8",
      },
      total_marks: 60,
      duration: 180,
      file_url: "http://localhost:6789/static/offer-letter-xomoy-signedpdf.pdf",
    },
    {
      year: 2,
      setter: {
        name: "chetan ingle",
        id: "6465df765b9ab09efc0b1661",
      },
      date: new Date(),
      subject: {
        name: "Geography",
        code: "GE15JKMK7I9L93",
      },
      total_marks: 60,
      duration: 180,
      file_url: "http://localhost:6789/static/offer-letter-xomoy-signedpdf.pdf",
    },
  ]);
});
export default paper_router;
