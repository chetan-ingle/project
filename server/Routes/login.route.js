import express from "express";
import moderatorModel from "../model/moderator.model.js";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const akg = await moderatorModel.findOne({ email, password });
    if (!akg) {
      return res
        .status(400)
        .json({ data: null, error: "No user found." });
    }
    return res
      .status(200)
      .cookie("srpd_user_auth", JSON.stringify(email), { httpOnly: true })
      .json({ data: akg, message: "Sucess.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: "Something went wrong." });
  }
});

export default loginRouter;
