import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";

// model
import moderatorModel from "./model/moderator.model.js";
import paperSetterModel from "./model/paperSetter.model.js";
import applyRouter from "./Routes/applications.route.js";
import applicationModel from "./model/application.model.js";
const PORT = process.env.PORT || 6789;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/application", applyRouter);

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
