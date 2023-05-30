import express from "express";
import examinerModel from "../model/examiner.model.js";
import moderatorModel from "../model/moderator.model.js";

const ModeratorRouter = express.Router();

/**
 * @param {String} email
 * @param {String} password
 * @param {String} name
 * @param {Number} experience
 * @param {String} qualification
 * @param {String} institute
 * @param {String[]} subject
 * @param {String} phone
 * @param {String} address
 * @param {String} profile
 * @param {String[]} previousWork
 * @param {String} role
 *
 *
 */

//  get all moderators
ModeratorRouter.get("/", async (req, res) => {
  try {
    const moderators = await moderatorModel.find({});
    return res
      .status(200)
      .json({ data: moderators, message: "Success.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: "Something went wrong." });
  }
});

//  get all assigned subjects
ModeratorRouter.get("/subjects/assigned", async (req, res) => {
  try {
    const moderators = await moderatorModel.find({}).select("subject");
    const data = moderators.map((i) => i.subject.map((i) => i.code)).flat();

    return res
      .status(200)
      .json({
        data,
        message: "Already assigned subjects disabled.",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: "Something went wrong." });
  }
});

// get a moderator by id
ModeratorRouter.get("/:id", async (req, res) => {
  try {
    const moderator = await moderatorModel.findById(req.params.id);
    return res

      .status(200)
      .json({ data: moderator, message: "Success.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: "Something went wrong." });
  }
});

//  get a moderator by email
ModeratorRouter.get("/email", async (req, res) => {
  try {
    const moderator = await moderatorModel.findOne({ email: req.params.email });
    return res

      .status(200)
      .json({ data: moderator, message: "Success.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: "Something went wrong." });
  }
});

// create a moderator
ModeratorRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const moderator = new moderatorModel({
      ...req.body,
      password: req.body.password,
    });
    const akg = await moderator.save();
    return res
      .status(200)
      .json({ data: akg, message: "Success.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: "Something went wrong." });
  }
});

export default ModeratorRouter;
