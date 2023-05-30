export default function alert_moderator({ name, subject, email, password }) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Notification</title></head><body style="border-radius:1rem;background:#eee;padding:4rem;min-height:400px"><style>*{box-sizing:border-box}h1,h2,h3,h4,li,ol,p,ul{font-family:"Open Sans",Arial,Helvetica,sans-serif,sans-serif,sans-serif,sans-serif}</style><main style="background:#fff;width:90%;max-width:500px;margin:auto;display:flex;justify-content:center;flex-direction:column;padding:1rem;border-radius:.5rem"><h4>Hello ${name},<br><br><b>Alert:</b>you are selected as a Moderator.</h4>
<div>
<h4>
Your subjects are as follow.
</h4>
<ul>
${subject
  .map(({ name, code }) => {
    return `<li><strong>${name}(${code})</strong></li>`;
  })
  .join("")}
  </ul>
  </div>
<p>your credentials are User id:${email}, password:${password}</p><p>Please login here,<a href="${
    process.env.MODERATOR_LOGIN_LINK
  }">Login here.</a></p></main></body></html>`;
}
