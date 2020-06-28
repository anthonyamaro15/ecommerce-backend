const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const nodemailer = require("nodemailer");
const User = require("../schemas/auth_schema");
const {
  validateUser,
  validateCredentials,
  validateId,
} = require("../validation/validateUser");
const { generateToken } = require("../middlewares/generateToken");
const main = require("../auth/sendEmail");
const { response } = require("../api/server");

const route = express.Router();

// "email": "lisa@example.com",
// "password": "lisa1"

// POST /api/auth/register
route.post("/register", validateUser, (req, res) => {
  const credentials = req.body;
  const { email } = req.body;

  User.findBy({ email }).then((user) => {
    if (user.length > 0) {
      res.status(400).json({ errMessage: "Email already taken" });
    } else {
      const hash = bcrypt.hashSync(credentials.password, 8);
      credentials.password = hash;
      User.add(credentials)
        .then(([user]) => {
          //  main(email);
          res.status(201).json(user);
        })
        .catch((err) => {
          res
            .status(500)
            .json({ errMessage: "there was an error creating the account" });
        });
    }
  });
});

// POST /api/auth/login
route.post("/login", validateCredentials, (req, res) => {
  const { email, password } = req.body;

  User.findBy({ email })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ user: user.id, token });
      } else {
        res.status(400).json({ errMessage: "Invalid email or password" });
      }
    })
    .catch((err) => {
      res.status(500).json({ errMessage: "there was an error logging in" });
    });
});

// PUT /api/auth/edit/:id
route.patch("/edit/:id", validateId, (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  User.updateUser(id, changes)
    .then((user) => {
      console.log("patching user ", user);
      res.status(200).json(user);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errMessage: "there was an error updating profile" });
    });
});

// send email to reset password
// PATCH /api/auth/forgot
route.patch("/forgot", (req, res) => {
  const { email } = req.body;

  User.findBy({ email })
    .then(([user]) => {
      // console.log("===================> ", user);
      if (!user) {
        res
          .status(404)
          .json({ errMessage: "user with this email does not exist" });
      } else {
        const token = jwt.sign({ user: user.email }, process.env.RESET_PASS, {
          expiresIn: "40m",
        });

        const id = user.id;
        //   console.log("new changese ", newChange);
        User.updateUser(id, { resetLink: token })
          .then((usr) => {
            async function main() {
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
                text: "Account Activation Link", // plain text body
                html: `
                <h2>Please click on given link to resest your password</2>
                <a>http://localhost:4000/api/auth/resetpassword/${token}</a>
                `, // html body
              });

              console.log("Message sent: %s", info.messageId);
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            }
            // main();
            res.status(200).json({ message: "reset link has been updated." });
          })
          .catch((err) => {
            res
              .status(500)
              .json({ errMessage: "there was an error updating the link" });
          });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errMessage: "there was an error from the server." });
    });
});

route.patch("/resetpassword/:token", (req, res) => {
  const { token } = req.params;
});

module.exports = route;

// add property to database reseToken, allow nulls
// make a put request
// create new token, update that token to ressetToken from database
// when user clicks in link redirect to a form to with 2 inputs to reset password
// make a new put/patch request and compare the token from url to the one in the database
// if it matches then update new password. hash new password and save it to dabase if it does not match then send an error
//  when finish send a comfirmation email about the updated password
