import express from "express";
import moderatorModel from "../model/moderator.model.js";
import examinerModel from "../model/examiner.model.js";
import paperSetterModel from "../model/paperSetter.model.js";

const loginRouter = express.Router();

loginRouter.post("/moderator", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const akg = await moderatorModel.findOne({ email, password });
    if (!akg) {
      return res.status(400).json({ data: null, error: "No user found." });
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

loginRouter.post("/examiner", async (req, res) => {
  try {
    const akg = await examinerModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!akg) {
      return res.status(400).json({ data: null, error: "No user found." });
    }
    return res
      .status(200)
      .json({ data: akg, message: "Sucess.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: "Something went wrong." });
  }
});

//  setter login
loginRouter.post("/setter", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password)
    const akg = await paperSetterModel.findOne({
      email,
      password,
    });
   
    if (!akg) {
      return res.status(400).json({ data: null, error: "No user found." });
    }
    return res
      .status(200)
      .json({ data: akg, message: "Paper setter logged in", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: "Something went wrong." });
  }
});

export default loginRouter;
