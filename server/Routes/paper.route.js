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
    const codes = examiner.subjects.;
    let papers = examiner.subjects.map(async (subject) => {
      return await paperModel.findOne({ "subject.code": subject.code });
    });

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

//   await paperModel.insertMany([
//     {
//       year: 3,
//       setter: {
//         name: "Aniket Tote",
//         id: "6465c0445b9ab09efc0b163c",
//       },
//       date: new Date(),
//       subject: {
//         name: "Compiler Design",
//         code: "COC0J5IL96DCE8",
//       },
//       total_marks: 60,
//       duration: 180,
//       file_url: "http://localhost:6789/static/offer-letter-xomoy-signedpdf.pdf",
//     },
//     {
//       year: 2,
//       setter: {
//         name: "chetan ingle",
//         id: "6465df765b9ab09efc0b1661",
//       },
//       date: new Date(),
//       subject: {
//         name: "Geography",
//         code: "GE15JKMK7I9L93",
//       },
//       total_marks: 60,
//       duration: 180,
//       file_url: "http://localhost:6789/static/offer-letter-xomoy-signedpdf.pdf",
//     },
//   ]);
// });
export default paper_router;

let a = {
  data: [
    {
      _id: "646c9f995378e1a769155375",
      name: "Sushant Nirphal",
      experience: 48,
      qualification: "M.Tech(CD)",
      institute: "GCOE Yavatmal",
      subject: [
        {
          _id: "647331e840bab806d0eb80ba",
          name: "Compiler Design",
          code: "COC0J5IL96DCE8",
        },
        {
          _id: "647331e840bab806d0eb80bb",
          name: "Geography",
          code: "GE15JKMK7I9L93",
        },
      ],
      email: "sushnirph3al@gmail.com",
      phone: "+91 9544 243 333",
      address: "At naringe nagar",
      profile: "https://avatars.githubusercontent.com/u/76222991?v=4",
      password: "abc",
      previousWork: ["djngvjfng59u89m5vjkg", "fcjmf49385mthvg"],
      role: "moderator",
      createdAt: "2023-05-23T11:12:25.647Z",
      updatedAt: "2023-05-23T11:12:25.647Z",
      __v: 0,
    },
    {
      _id: "646c9fa65378e1a769155382",
      name: "Sushant Nirphal",
      experience: 48,
      qualification: "M.Tech(CD)",
      institute: "GCOE Yavatmal",
      subject: [
        {
          _id: "647331e840bab806d0eb80bc",
          name: "History",
          code: "HIG45LG90H587B",
        },
        {
          _id: "647331e840bab806d0eb80bd",
          name: "Marathi",
          code: "MAN3GMAFMH0FD9",
        },
      ],
      email: "sushnirph4al@gmail.com",
      phone: "+91 9544 233 333",
      address: "At naringe nagar",
      profile: "https://avatars.githubusercontent.com/u/76222991?v=4",
      password: "dkvgmfsjknb5409uv09u8965vmjy",
      previousWork: ["djngvjfng59u89m5vjkg", "fcjmf49385mthvg"],
      role: "moderator",
      createdAt: "2023-05-23T11:12:38.041Z",
      updatedAt: "2023-05-23T11:12:38.041Z",
      __v: 0,
    },
    {
      _id: "646c9fad5378e1a769155384",
      name: "chetan",
      experience: 64,
      qualification: "btech",
      institute: "gcoey",
      subject: [
        {
          _id: "647331e840bab806d0eb80be",
          name: "DBMS",
          code: "DBAHMJCI2E9216",
        },
        {
          _id: "647331e840bab806d0eb80bf",
          name: "Bid data analytics",
          code: "BID03L9GIC41N7",
        },
      ],
      email: "inglechet@gmail.com",
      phone: "88533",
      address: "ytl",
      profile:
        "https://w7.pngwing.com/pngs/485/458/png-transparent-cisco-systems-vpn-client-cisco-anyconnect-vpn-client-computer-icons-virtual-private-network-secure-miscellaneous-trademark-logo.png",
      previousWork: ["64"],
      role: "moderator",
      createdAt: "2023-05-23T11:12:45.889Z",
      updatedAt: "2023-05-23T11:12:45.889Z",
      __v: 0,
    },
  ],
  message: "Success.",
  success: true,
};
