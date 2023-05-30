import { Router } from "express";
import adminModel from "../model/admin.model.js";
const AdminRouter = Router();
import moderatorModel from "../model/moderator.model.js";
import examinerModel from "../model/examiner.model.js";
import subjectModel from "../model/subject.model.js";
import { sendMail } from "../email/sendMail.js";
import alert_moderator from "../template/alert_moderator.js";
import alert_examiner from "../template/alert_examiner.js";
// me
AdminRouter.get("/me", async (req, res) => {
  try {
    const data = await adminModel.findOne();
    return res.status(200).json({
      error: false,
      data,
      message: "Admin profile.",
    });
  } catch (error) {
    return res.status(400).json({
      error: false,
      message: "Bad request",
    });
  }
});

// get examiners
AdminRouter.get("/get/examiners", async (req, res) => {
  try {
    const data = await examinerModel.find();
    return res.status(200).json({
      error: false,
      data,
      message: "All Examiners fetched.",
    });
  } catch (error) {
    return res.status(400).json({
      error: false,
      message: "Bad request",
    });
  }
});
// create moderator
AdminRouter.post("/create/moderator", async (req, res) => {
  const payload = req.body;
  try {
    const akg = await moderatorModel.create(payload);
    await sendMail({
      html: alert_moderator({
        email: payload.email,
        name: payload.name,
        password: payload.phone,
        subject: payload.subject,
      }),
      subject:"Selection as a Moderator",
      to:payload.email,
    });
    return res.status(200).json({
      error: false,
      message: "Moderator created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: true,
      message: "Failed to create moderator. Duplicate email found.",
    });
  }
});

// create examiner
AdminRouter.post("/create/examiner", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  try {
    const akg = await examinerModel.create(payload);
    //sending email
    await sendMail({
      html: alert_examiner({
        email: payload.email,
        name: payload.name,
        institute:payload.institute,
        address:payload.institute_address,
        password: payload.phone,
        subject: payload.subjects,
      }),
      subject:"Selection as a Examiner",
      to:payload.email,
    });
    return res.status(200).json({
      error: false,
      message: "examiner created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: true,
      message: "Failed to create examiner. Duplicate email found",
    });
  }
});

// create subject
AdminRouter.post("/create/subject", async (req, res) => {
  const payload = req.body;
  try {
    const akg = await subjectModel.create(payload);
    return res.status(200).json({
      error: false,
      message: " created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: false,
      message: "Failed to create examiner.",
    });
  }
});
export default AdminRouter;
