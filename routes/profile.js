const express = require("express");
const router = express();
const Person = require("../Models/Person");

router.get("/", (req, res) => {
  res.send("Profile Home Get!");
});

router.post("/", (req, res) => {
  res.send("Profile Home Post..");
});

router.post("/userProfile/:username", (req, res) => {
  Person.findOne({ name: req.params.username })
    .then(person => {
      if (!person) {
        return;
      }
      return res.json({ payload: person });
    })
    .catch(err => console.log(err));
});

module.exports = router;
