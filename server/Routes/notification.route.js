import { Router } from "express";
import notificationModel from "../model/notification.model.js";

const notificationRouter = Router();

notificationRouter.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const data = await notificationModel.find({ email });
    return res.status(200).json({
      data,
      success: true,
      message: "Notification loaded successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      data: null,
      error: "Something went wrong.",
    });
  }
});

export default notificationRouter;
