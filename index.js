const socket = require("socket.io");
const bodyparser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const auth = require("./routes/auth");
const db = require("./setup/url").mongoURL;
const key = require("./setup/url").secret;
const cookieparser = require("cookie-parser");
const session = require("express-session");
const profile = require("./routes/profile");
connection = [];
users = [];

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(
  session({
    secret: key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 604800000, // 1 Week
      httpOnly: true
    }
  })
);

app.use(cookieparser());
app.use("/myuploads", express.static("./public/myuploads/"));

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected Succesfully!"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use("/auth", auth);
app.use("/profile", profile);
const server = app.listen(port, () => {
  console.log(`Server at ${port}`);
});

// Socket Init..
const io = socket(server);
io.on("connection", socket => {
  connection.push(socket.id);

  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });

  socket.on("disconnect", function() {
    let index = connection.indexOf(socket.id);
    connection.splice(index, 1);
    users.splice(index, 1);
  });
});
module.exports = app;
