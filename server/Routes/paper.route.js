import { Router } from "express";
import paperModel from "../model/paper.model.js";

const paper_router = Router();

// get papers by id(moderator id)
paper_router.get("/:subject", async (req, res) => {
  const { subject } = req.params;
  try {
    const data = await paperModel.find({
      subject,
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
        name: "Sanket Gawande",
        id: "6456b0100136638de8d6e626",
      },
      date: new Date(),
      subject_code: "UIHI8090UU8J",
      subject: "Compiler design",
      total_marks: 60,
      duration: 180,
      file_url: "http://localhost:6789/static/offer-letter-xomoy-signedpdf.pdf",
    },
    {
      year: 2,
      setter: {
        name: "Sushant Gawande",
        id: "6456b0100136638de8d6e626",
      },
      date: new Date(),
      subject_code: "904U98YTJGIMOK",
      subject: "maths",
      total_marks: 60,
      duration: 180,
      file_url: "http://localhost:6789/static/offer-letter-xomoy-signedpdf.pdf",
    },
  ]);
});
export default paper_router;
