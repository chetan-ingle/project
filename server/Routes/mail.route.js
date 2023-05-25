import { Router } from "express";
import { sendMail } from "../email/sendMail.js";
import notificationModel from "../model/notification.model.js";
import notify_setter from "../template/notify.js";

const emailRouter = Router();

emailRouter.post("/notify/setter", async (req, res) => {
  const { name, email, subject } = req.body;
  if (!name || !email || !subject) {
    return res.send({
      success: false,
      message: "Please provide requied fieds",
    });
  }
  try {
    const email_akg = await sendMail({
      from: process.env.EMAIL,
      to: email,
      html: notify_setter({ name, subject }),
      subject: "Notification regarding question paper application",
    });
    await notificationModel.create({
      email,
      subject: "Notification regarding question paper application",
      description: notify_setter({ name, subject }),
      name,
      to: "paper-setter",
    });
    return res.status(200).json({
      success: true,
      message: `Notification send to ${name} for the subject ${subject}`,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Error while notifying candidate, plese try again.",
    });
  }
});

export default emailRouter;
