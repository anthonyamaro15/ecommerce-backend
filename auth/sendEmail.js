("use strict");
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(email) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER, // generated ethereal user
      pass: process.env.GMAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${process.env.NAME} <${process.env.GMAIL_USER}>`, // sender address
    to: email, // list of receivers
    subject: "noreplay", // Subject line
    text: "Welcome", // plain text body
    html: "<b>Thanks for joining<h2>P&Con</2></b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

// main().catch(console.error);
// console.log(process.env.GMAIL_PASS);

module.exports = main;
