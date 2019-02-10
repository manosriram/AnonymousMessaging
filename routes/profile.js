const express = require("express");
const router = express();
const Person = require("../Models/Person");
const jsonwt = require("jsonwebtoken");
const key = require("../setup/url").secret;

router.post("/getStatus", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    res.json({ name: user.name });
  });
});

router.post("/getSent", (req, res) => {
  const email = req.body.data.email;
  var data = [];
  var messages = [];

  async function start() {
    await Person.findOne({ email: email }).then(person => {
      for (t = 0; t < person.messageModel.sentTo.length; t++) {
        data[t] = person.messageModel.sentTo[t];
      }
      messages = person.messageModel.sentMessages;
      return res.json({ people: data, sentMessages: messages });
    });
  }
  start();
});

router.post("/getMessages", (req, res) => {
  const email = req.body.data.email;
  Person.findOne({ email: email })
    .then(person => {
      return res.json({ messages: person.messageModel.messages });
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
  const message = req.body.message;
  const email = req.body.data;

  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    if (user) {
      Person.findOne({ email: user.email })
        .then(per => {
          per.sentMessages.push(message);

          Person.findOne({ email: email })
            .then(person => {
              person.messageModel.messages.push(message);
              per.messageModel.sentTo.push(person.name);
              per.messageModel.sentMessages.push(message);
              person.save();
              per.save();
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
