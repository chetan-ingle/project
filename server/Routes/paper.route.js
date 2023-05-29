import { Router } from "express";
import paperModel from "../model/paper.model.js";
import moderatorModel from "../model/moderator.model.js";
import examinerModel from "../model/examiner.model.js";
import { ostype, path } from "../utils/os.js";
const paper_router = Router();
import fs from "fs";

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
    const codes = examiner.subjects.map(a => subject.code);
    // let papers = examiner.subjects.map(async (subject) => {
    //   return await paperModel.findOne({ "subject.code": subject.code });
    // });

    // const data = await paperModel.find({
    //   "subject.code": subject,
    // });
    // data.file_url = undefined;
    return res
      .status(200)
      .json({ data: papers, message: "success.", success: true });
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
  req.files.file.mv(
    ostype === "Linux"
      ? path.trim() + "/" + filename
      : `${process.env.PAPER_CONTENT_PATH}${filename}`,
    (error) => {
      console.log(error, path);
    }
  );
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

//   view paper content by paper code
paper_router.get("/moderator/view", async (req, res) => {
  const { pid, mid } = req.query;
  console.log(mid, pid);
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

    console.log(moderator?.subject, pid);

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
      `${process.env.PAPER_CONTENT_PATH}${data.file_url}`
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

//  accept paper and shcedule exam

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

//   view paper content by paper code
paper_router.post("/moderator/accept", async (req, res) => {
  const payload = req.body;
  console.log(payload);

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
    console.log(data);

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
