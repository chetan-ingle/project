import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const akg = transport.sendMail({
  to: "sanketgawande.gcoey@gmail.com",
  text: "Hello there",
  subject: "Test",
});

console.log(akg);
