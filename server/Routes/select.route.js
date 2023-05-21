import express from "express";
const selectRouter = express.Router();
import paperSetterModel from "../model/paperSetter.model.js";
import applicationModel from "../model/application.model.js";
import { sendMail } from "../email/sendMail.js";
import setter_selection_mail from "../template/selection.js";
// import {randomUUID} from "crypto";

function randomUUID() {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  const suffix = "xxxxxxxxxxxxxxxx"
    .replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
    .toLowerCase();
  return `${timestamp}${suffix}`;
}

selectRouter.post("/", async (req, res) => {
  const { selected_email = [], subject } = req.body;
  // return
  if (!selected_email.length) {
    return res.status(400).json({ data: null, error: "No user found." });
  }

  try {
    const selected_ids_from_db = await paperSetterModel.find(
      {
        email: {
          $in: selected_email,
        },
      },
      {
        email: 1,
      }
    );
    const existing_email = selected_ids_from_db.map((item) => item.email);

    const unique_email = selected_email.filter((item) => {
      return !existing_email.includes(item);
    });
    console.log({ selected_email }, { existing_email }, { unique_email });

    const getSelected = await applicationModel.find({
      email: {
        $in: unique_email,
      },
    });

    const selected = getSelected.map((item) => {
      async function sendMailToUser() {
        try {
          const mail = await sendMail({
            from: process.env.EMAIL,
            to: item.email,
            subject:
              "Application selected for paper setting for subject " + subject,
            text:
              "Your application is selected for paper setting for subject " +
              subject,
            html: setter_selection_mail(
              item.name,
              subject,
              item.email,
              item.phone.split(" ").join("")
            ),
          });
          console.log(mail);
        } catch (error) {
          console.log(error);
        }
      }
      sendMailToUser();
      return {
        ...item._doc,
        _id: randomUUID(),
        subject: subject,
        password: item.phone.split(" ").join(""),
      };
    });
    const duplicate = selected_ids_from_db.length - unique_email.length || 0;

    if (!selected.length) {
      return res.status(400).json({
        data: null,
        error: duplicate
          ? ` ${duplicate} duplicate applications Found.`
          : "No application found for selected id.",
      });
    }

    const akg = await paperSetterModel.insertMany(selected);

    return res.status(200).json({
      data: akg,
      message: duplicate
        ? `Applications selected successfully. ${duplicate} duplicate applications ignored.`
        : "Applications selected successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ data: null, error: "Duplicate entries ignored." });
  }
});

selectRouter.get("/:subject", async (req, res) => {
  try {
    const { subject } = req.params;
    const akg = await paperSetterModel.find(
      { subject: { $in: [subject] } },
      { profile: 0 }
    );
    return res.status(200).json({
      data: akg,
      message: "Applications selected successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ data: null, error: "Something went wrong." });
  }
});

export default selectRouter;
