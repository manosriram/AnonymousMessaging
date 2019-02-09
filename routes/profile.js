const express = require("express");
const router = express();
const Person = require("../Models/Person");
const jsonwt = require("jsonwebtoken");
const key = require("../setup/url").secret;

router.get("/", (req, res) => {
  res.send("Profile Home Get!");
});

router.post("/", (req, res) => {
  res.send("Profile Home Post..");
});

router.post("/getMessages", (req, res) => {
  const email = req.body.data.email;
  Person.findOne({ email: email })
    .then(person => {
      // console.log(person.messages);
      return res.json({ messages: person.messages });
    })
    .catch(err => console.log(err));
});

router.post("/getAllUsers", (req, res) => {
  Person.find()
    .then(people => {
      res.json({ users: people });
    })
    .catch(err => console.log(err));
});

router.post("/userProfile/:username", (req, res) => {
  Person.findOne({ name: req.params.username })
    .then(person => {
      if (!person) {
        return res.status(404);
      }
      return res.json({ payload: person });
    })
    .catch(err => console.log(err));
});

router.post("/sendMessage", (req, res) => {
  // const message = req.body.message;
  const message = req.body.message;
  const email = req.body.data;

  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    if (user) {
      Person.findOne({ email: user.email })
        .then(per => {
          per.sentMessages.push(message);
          per.save();

          Person.findOne({ email: email })
            .then(person => {
              person.messages.push(message);
              person.save();
              console.log("message sent!");
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
