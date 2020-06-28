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

const route = express.Router();

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

  if (changes.email) {
    return res
      .status("400")
      .json({ errMessage: "you are not allow to change the email" });

    // if password changes then we need to hash it again
  } else if (changes.password) {
    const hash = bcrypt.hashSync(changes.password, 8);
    changes.password = hash;
    User.updateUser(id, changes)
      .then((user) => {
        return res
          .status(200)
          .json({ message: "password has been updated successfully" });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ errMessage: "there was an error updating profile" });
      });
  } else {
    User.updateUser(id, changes)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ errMessage: "there was an error updating profile" });
      });
  }
});

// send email to reset password
// PATCH /api/auth/forgot
route.patch("/forgot", (req, res) => {
  const { email } = req.body;

  User.findBy({ email })
    .then(([user]) => {
      if (!user) {
        res
          .status(404)
          .json({ errMessage: "user with this email does not exist" });
      } else {
        const token = jwt.sign({ user: user.email }, process.env.RESET_PASS, {
          expiresIn: "40m",
        });

        const id = user.id;

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
                <a href=${process.env.SECRET_URL}/api/auth/resetpassword/${token}>${process.env.SECRET_URL}/api/auth/resetpassword/${token}</a>
                `, // html body
              });

              console.log("Message sent: %s", info.messageId);
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            }
            main();
            res.status(200).json({ message: "reset link has been sent." });
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

// PATCH /api/auth/resetpassword/:token
// resets password and hashes password again
route.patch("/resetpassword/:token", (req, res) => {
  const resetLink = req.params.token;
  let credentials = req.body;

  if (resetLink) {
    jwt.verify(resetLink, process.env.RESET_PASS, (error, decodedToken) => {
      if (error) {
        return res
          .status(401)
          .json({ errMessage: "Incorrect token or it is expired." });
      }
    });
  }

  // we check if the resetLink exist in database
  User.findBy({ resetLink })
    .then(([link]) => {
      if (!link) {
        res
          .status(400)
          .json({ errMessage: "user with this token does not exist" });
      }

      // we need to hash password again
      const hash = bcrypt.hashSync(credentials.password, 8);
      credentials.password = hash;

      const id = link.id;
      const obj = {
        password: credentials.password,
        resetLink: "",
      };

      // updating with new password
      User.updateUser(id, obj)
        .then((user) => {
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
              to: link.email, // list of receivers
              subject: "noreplay", // Subject line
              text: "activities", // plain text body
              html: `
                <h2>thank you</2>
                <p>your password was successfully updated</p>
                `, // html body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          }
          main();
          res
            .status(200)
            .json({ message: "password has been updated successfully" });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ errMessage: "there was an error updation the passowrd" });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errMessage: "there was an error finding the user" });
    });
});

module.exports = route;
