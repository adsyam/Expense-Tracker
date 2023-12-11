const nodemailer = require("nodemailer")

const emailManager = async (to, text, html, subject, from) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })

  await transport.sendMail({
    to: to,
    from: "Info@expensetracker.com",
    text: text,
    html: html,
    subject: subject,
  })
}

module.exports = emailManager
