import { Schema, model } from "mongoose";

const paperSchema = Schema({
  year: String,
  date: Date,
  code: String,
  subName: String,
  totalMarks: Number,
  duration: String,
  availableWeightages: [3, 4, 5],
  questions: [
    {
      question: String,
      weightage: Number,
    },
  ],
});


export default model('paper' , paperSchema)