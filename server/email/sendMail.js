import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export async function 
sendMail({ from=process.env.EMAIL, to, subject, text, html }) {
  const mail = await transport.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  return mail;
}
