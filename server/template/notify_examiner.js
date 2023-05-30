export default function notify_examiner({ name, subject, date }) {
  return `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8" /> <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Notification</title> </head> <body style=" border-radius: 1rem; background: #eee; padding: 4rem; min-height: 400px; "> <style> * { box-sizing: border-box; } h1, h2, h3, h4, li, ol, p, ul { font-family: "Open Sans", Arial, Helvetica, sans-serif, sans-serif, sans-serif, sans-serif; } </style> <main style=" background: #fff; width: 90%; max-width: 500px; margin: auto; display: flex; justify-content: center; flex-direction: column; padding: 1rem; border-radius: 0.5rem; "> <h4> Hello ${name}, <br /> <br /> <b> Reminder: </b> </h4> <p>paper of (${
    subject.code
  }(${subject.name})) has been schedule please be aware </p> 
  paper timing will be <strong>${new Date(date).toLocaleString("en-in", {
    dateStyle: "full",
    timeStyle: "full",
  })}</strong>
  </main> </body> </html>`;
}
