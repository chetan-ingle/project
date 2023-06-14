import { Router } from "express";
import paperModel from "../model/paper.model.js";
import moderatorModel from "../model/moderator.model.js";
import examinerModel from "../model/examiner.model.js";
import { ostype, path } from "../utils/os.js";
const paper_router = Router();
import fs from "fs";
import { sendMail } from "../email/sendMail.js";
import notify_examiner from "../template/notify_examiner.js";
import { execPath } from "process";
import { exec } from "child_process";

const dir = exec("pwd", (err, stdout, stderr) => {
  if (err) {
    console.log(err);
  }
  return stdout;
});
const PAPER_CONTENT_PATH =
  ostype === "windows" ? `${dir}\\data-paper\\` : `${dir}/data-paper/`;
// get papers by id(paper  id)
paper_router.get("/:subject", async (req, res) => {
  const { subject } = req.params;
  try {
    const data = await paperModel.find({
      "subject.code": subject,
    });
    data.file_url = undefined;
    return res.status(200).json({ data, message: "Success.", error: false });
  } catch (error) {
    return res
      .status(400)
      .json({ data: null, message: "Fail to load q-papers.", error: true });
  }
});

//get paper for examiner by their email
paper_router.post("/get/examiner-paper", async (req, res) => {
  const { email } = req.body;
  try {
    const examiner = await examinerModel.findOne({ email: email });
    const codes = examiner.subjects.map((a) => a.code);

    // let papers = examiner.subjects.map(async (subject) => {
    //   return await paperModel.findOne({ "subject.code": subject.code });
    // });

    // const data = await paperModel.find({
    //   "subject.code": subject,
    // });
    // data.file_url = undefined;
    const papers_to_send = await paperModel
      .find({
        "status.accepted": true,
        "subject.code": {
          $in: codes,
        },
      })
      .select("-file_url -setter -date");
    return res
      .status(200)
      .json({ data: papers_to_send, message: "success.", success: true });
  } catch (error) {
    return res
      .status(400)
      .json({ data: null, message: error.message, error: true });
  }
});

// post paper- route for setters
paper_router.post("/", async (req, res) => {
  if (!req.files)
    return res
      .status(400)
      .json({ data: null, error: true, message: "No file found." });

  const { size, mimetype, name } = req.files.file;
  const filename = `${name}.${mimetype.split("/")[1]}`;
  req.files.file.mv(`${PAPER_CONTENT_PATH}${filename}`, (error) => {
    console.log(error, path);
  });
  const payload = {
    ...req.body,
    setter: {
      name: req.body.name,
      id: req.body.id,
    },
    subject: {
      name: req.body.subject,
      code: req.body.subject_code,
    },
    file_url: filename,
  };

  try {
    const akg = await paperModel.create(payload);
    if (!akg) {
      return res
        .status(400)
        .json({ data: null, error: true, message: "Something went wrong." });
    }
    return res.status(200).json({
      data: akg,
      message: "Paper submitted successfully.",
      error: false,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ data: null, error: true, message: "Something went wrong." });
  }
});

//  get paper by id
paper_router.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await paperModel.findOne({
      "setter.id": id,
    });
    data.file_url = undefined;
    return res.status(200).json({
      data: { status: data ? true : false, date: data.date },
      message: "Success.",
      error: false,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ data: null, message: "Fail to load q-papers.", error: true });
  }
});

//   view paper content by paper code for moderator
/**
 * @query {pid} string
 * @query {mid} string
 * @returns {Buffer}
 *
 */
paper_router.get("/moderator/view", async (req, res) => {
  const { pid, mid } = req.query;

  try {
    // check if moderator exists
    const moderator = await moderatorModel.findOne({
      email: mid,
    });

    if (!moderator) {
      return res.status(400).json({
        data: null,
        message: "Invalid moderator.",
        error: true,
      });
    }

    // check if moderator is allowed to view paper
    if (
      moderator?.subject.filter((subject) => subject.code === pid).length === 0
    ) {
      return res.status(400).json({
        data: null,
        message: "You are not allowed to view paper.",
        error: false,
      });
    }

    const data = await paperModel.findOne(
      {
        "subject.code": pid,
      },
      {
        file_url: 1,
      }
    );

    if (!data) {
      return res.status(400).json({
        data: null,
        message: "Invalid paper.",
        error: false,
      });
    }
    const file = fs.readFileSync(
      `${PAPER_CONTENT_PATH}${data.file_url}`
    );
    return res.status(200).header("Content-Type", "application/pdf").send(file);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      data: null,
      message: "Fail to load paper content.",
      error: true,
    });
  }
});

// view paper content and download (examiner)
/**
 * @query {pid} string
 * @query {eid} string
 * @returns {Buffer}
 *
 */

paper_router.get("/examiner/view", async (req, res) => {
  const { pid, eid } = req.query;
  function check_if_availabel(time, window) {
    return (
      new Date(time).getTime() - Number(window) * 60 * 1000 <=
      new Date().getTime()
    );
  }

  try {
    // check if examiner exists
    const examiner = await examinerModel.findOne({
      email: eid,
    });

    if (!examiner) {
      return res.status(400).json({
        data: null,
        message: "Invalid examiner.",
        error: true,
      });
    }

    // check if examiner is allowed to view paper
    if (
      examiner?.subjects.filter((subject) => subject.code === pid).length === 0
    ) {
      return res.status(400).json({
        data: null,
        message: "You are not allowed to view paper or download paper.",
        error: false,
      });
    }

    const data = await paperModel.findOne(
      {
        "subject.code": pid,
        "status.accepted": true,
      },
      {
        file_url: 1,
        status: 1,
      }
    );
    const check_availabel = check_if_availabel(
      data.status.time,
      data.status.allow_before
    );
    if (!check_availabel) {
      return res.status(400).json({
        data: null,
        message: `Paper is scheduled for ${new Date().toLocaleString("en-in", {
          dateStyle: "full",
          timeStyle: "medium",
        })}.`,
        error: false,
      });
    }
    if (!data) {
      return res.status(400).json({
        data: null,
        message: "Invalid paper.",
        error: false,
      });
    }
    const file = fs.readFileSync(
      `${PAPER_CONTENT_PATH}${data.file_url}`
    );
    return res.status(200).header("Content-Type", "application/pdf").send(file);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      data: null,
      message: "Fail to load paper content.",
      error: true,
    });
  }
});

//  get paper by id
paper_router.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await paperModel.findOne({
      "setter.id": id,
    });
    data.file_url = undefined;
    return res.status(200).json({
      data: { status: data ? true : false, date: data.date },
      message: "Success.",
      error: false,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ data: null, message: "Fail to load q-papers.", error: true });
  }
});

//  accept paper and shcedule exam

paper_router.post("/moderator/accept", async (req, res) => {
  const payload = req.body;

  try {
    // check if moderator exists
    // const moderator = await moderatorModel.findOne({
    //   email: mid,
    // });

    // if (!moderator) {
    //   return res.status(400).json({
    //     data: null,
    //     message: "Invalid moderator.",
    //     success: false,
    //   });
    // }

    // console.log(moderator?.subject, pid);

    // check if moderator is allowed to view paper
    // if (
    //   moderator?.subject.filter((subject) => subject.code === pid).length === 0
    // ) {
    //   return res.status(400).json({
    //     data: null,
    //     message: "You are not allowed to view paper.",
    //     error: false,
    //   });
    // }

    // getting examiners with subject code
    const examiner_emails = await examinerModel.find(
      {
        "subjects.code": {
          $in: [payload.subject.code],
        },
      },
      {
        email: 1,
        name: 1,
      }
    );

    //  sending them email
    examiner_emails.map(async ({ email, name }) => {
      await sendMail({
        from: process.env.EMAIL,
        to: email,
        html: notify_examiner({
          name,
          subject: payload.subject,
          date: payload.status.time,
        }),
        subject: `Reminder: Paper for ${payload.subject.name} (${payload.subject.code}) has been scheduled.`,
      });
    });

    const data = await paperModel.findOneAndUpdate(
      {
        "subject.code": payload.subject.code,
      },

      {
        $set: {
          status: {
            ...payload.status,
            accepted: true,
          },
        },
      }
    );

    if (!data) {
      return res.status(400).json({
        data: null,
        message: "Invalid paper.",
        error: false,
      });
    }

    return res.status(200).send({
      message: `Paper has been scheduled for ${new Date(payload.status.time)}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      data: null,
      message: "Fail to schedule paper .",
      error: true,
    });
  }
});

export default paper_router;
