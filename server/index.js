import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";
// model

import applyRouter from "./Routes/applications.route.js";
import applicationModel from "./model/application.model.js";
import loginRouter from "./Routes/login.route.js";
import SyllabusRouter from "./Routes/syllabus.route.js";
import selectRouter from "./Routes/setter.route.js";
import emailRouter from "./Routes/mail.route.js";
import addRouter from "./Routes/add.route.js";
import paper_router from "./Routes/paper.route.js";
import ModeratorRouter from "./Routes/moderator.route.js";
import notificationRouter from "./Routes/notification.route.js";
import SubjectRouter from "./Routes/subject.route.js";
const PORT = process.env.PORT || 6789;
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use("/static", express.static("static"));
app.use(express.json({ limit: "50mb" }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    safeFileNames: true,
  })
);
app.use(express.urlencoded({ extended: false }));

app.use("/api/application", applyRouter);
app.use("/api/moderator", ModeratorRouter);
app.use("/api/login", loginRouter);
app.use("/api/syllabus", SyllabusRouter);
app.use("/api/setter/", selectRouter);
app.use("/api/paper/", paper_router);
app.use("/api/mail/", emailRouter);
app.use("/api/add/", addRouter);
app.use("/api/notification/", notificationRouter);
app.use("/api/subject/", SubjectRouter);

app.get("/", async (req, res) => {
  try {
    const akg = await applicationModel.create({
      name: "Chetan Ingle",
      experience: 54,
      qualification: "M.Tech(LD)",
      institute: "GCOE Yavatmal",
      subject: ["Compiler design"],
      email: "chetan@gmail.com",
      phone: "+91 9544 643 344",
      address: "At naringe nagar",
      profile: "https://avatars.githubusercontent.com/u/76222991?v=4",
      password: "dkvgmfsjknb5409uv09u8965vmjy",
      previousWork: ["djngvjfng59u89m5vjkg", "fcjmf49385mthvg"],
    });

    res.json({ akg });
  } catch (error) {
    res.json(error);
  }

  //   const setter = await paperSetterModel.create({
  //     name: "Sushant Nirphal",
  //     experience: 48,
  //     qualification: "M.Tech(CD)",
  //     institute: "GCOE Yavatmal",
  //     subject: ["Compiler design"],
  //     email: "sushnirphdal@gmail.com",
  //     phone: "+91 9544 334 333",
  //     address: "At naringe nagar",
  //     profile: "https://avatars.githubusercontent.com/u/76222991?v=4",
  //     password: "dkvgmfsjknb5409uv09u8965vmjy",
  //     previousWork: ["djngvjfng59u89m5vjkg", "fcjmf49385mthvg"],
  //   });
});

mongoose.connect(process.env.MONGO_URI);
console.log("Connected to MongoAtlas");
app.listen(PORT, (error) => {
  error && console.log(error);
  if (!error) {
    console.log(`server is running at : http://localhost:${PORT}`);
  }
});

const subjects = {
  name: "CD",
  code: "BTC0034",
  chapter: ["unit 1", "unit 2"],
  notes: [
    {
      name: "",
      url: "",
    },
  ],
};
