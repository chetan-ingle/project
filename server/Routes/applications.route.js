import { Router } from "express";
import applicationModel from "../model/application.model.js";
import { v4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();
import paperSetterModel from "../model/paperSetter.model.js";
import nodemailer from "nodemailer";
const applyRouter = Router();

applyRouter.post("/create", async (req, res) => {
  const { payload } = req.body;

  if (!payload) {
    return res.status(201).json({
      success: false,
      message: "Empty body.",
    });
  }
  console.log(req.body.files);
  const role = payload.role;
  if (role === "setter") {
    try {
      const akg = await applicationModel.create({
        ...payload,
        name: `${payload.fname} ${payload.lname}`,
      });
      console.log(akg);
      res.status(200).json({
        success: true,
        message: "Successfully applied",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Something went wrong.",
      });
    }
  }
});

applyRouter.get("/list", async (req, res) => {
  const { payload } = req.body;
  const role = payload.role;
  if (role === "setter") {
    const akg = await applicationModel.find().sort({ experience: -1 });

    res.status(200).json({ data: akg });
  }
});

applyRouter.post("/short-list", async (req, res) => {
  const { payload } = req.body;
  const role = payload.role;
  if (role === "setter") {
    const shortListed = await applicationModel.find({
      _id: {
        $in: ["6416d7ddae15ddf406df1d2e"],
      },
    });
    shortListed.map(
      (obj) => (obj.password = v4().substring(0, 10).replace(/[-]/g, ""))
    );

    const akg = await paperSetterModel.insertMany(shortListed);
    res.status(200).json({ data: akg });
  }
});

applyRouter.get("/send", async (req, res) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const a = await transport.sendMail({
    to: "sanketgawande.gcoey@gmail.com",
    text: "Hello there",
    subject: "Test",
  });

  console.log(a);

  res.end();
});
export default applyRouter;
