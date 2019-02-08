const express = require("express");
const router = express();

router.get("/", (req, res) => {
  res.send("Profile Home Get!");
});

router.post("/", (req, res) => {
  res.send("Profile Home Post..");
});

router.post("/userProfile/:username", (req, res) => {
  console.log(req.body);
});

module.exports = router;
