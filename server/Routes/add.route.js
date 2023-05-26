import express from "express";
import examinerModel from "../model/examiner.model.js";
import moderatorModel from "../model/moderator.model.js";

const addRouter = express.Router();


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

addRouter.post("/moderator", async (req, res) => {
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



/**
 * 
 * @param {String} email
 * @param {String} password
 * @param {String} name
 * @param {Number} experience
 * @param {String} qualification
 * @param {String} institute
 * @param {String} subject
 * @param {String} phone
 * @param {String} address
 * @param {String} profile
 * @param {String[]} previousWork?
 * @param {String} role
 * 
 */


addRouter.post("/examiner", async (req, res) => {
  const { email, password } = req.body;
  try {
    const examiner = new examinerModel({
      ...req.body,
      password: req.body.password,
    });
    const akg = await examiner.save();
    return res
      .status(200)
      .json({ data: akg, message: "Success.", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: "Something went wrong." });
  }
});




export default addRouter;
