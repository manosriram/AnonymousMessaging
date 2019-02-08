const express = require("express");
const router = express.Router();
const Person = require("../Models/Person");
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const key = require("../setup/url").secret;

router.get("/", (req, res) => {
  res.send("Auth Page!!");
});

router.post("/", (req, res) => {
  res.send("Post Route1!");
});

router.post("/userRegister", (req, res) => {
  const email = req.body.payload.email;
  Person.findOne({ email })
    .then(person => {
      if (person) {
        return res.json({ alreadyRegistered: 1, registered: 0 });
      } else {
        const name = req.body.payload.name;
        var password = req.body.payload.password;
        const location = req.body.payload.location;
        const newPerson = new Person({
          name: name,
          email: email,
          password: password,
          location: location
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPerson.password, salt, (err, hash) => {
            newPerson.password = hash;
            newPerson
              .save()
              .then(
                res.json({ registered: 1, alreadyRegistered: 0, loading: 0 })
              )
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

router.post("/userLogin", (req, res) => {
  if (!req.cookies.auth_t) {
    const email = req.body.payload.email;
    const password = req.body.payload.password;
    Person.findOne({ email: email })
      .then(person => {
        if (!person) {
          return res.json({
            alreadyLogged: 0,
            loggedIn: 0,
            passwordIncorrect: 0,
            notFound: 1
          });
        }
        bcrypt
          .compare(password, person.password)
          .then(isCorrect => {
            if (isCorrect) {
              var payload = {
                id: person.id,
                name: person.name,
                email: person.email
              };
              jsonwt.sign(
                payload,
                key,
                { expiresIn: 9000000 },
                (err, token) => {
                  res.cookie("auth_t", token, { maxAge: 90000000 });
                  return res.json({
                    alreadyLogged: 0,
                    loggedIn: 1,
                    passwordIncorrect: 0,
                    notFound: 0,
                    payload: person
                  });
                }
              );
            } else {
              return res.json({
                alreadyLogged: 0,
                loggedIn: 0,
                passwordIncorrect: 1,
                notFound: 0,
                payload: person
              });
            }
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  } else {
    // });
    jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
      if (user) {
        return res.json({
          payload: user,
          alreadyLogged: 1,
          loggedIn: 0,
          passwordIncorrect: 0,
          notFound: 0
        });
      }
    });
  }
});

router.get("/userLogout", (req, res) => {
  jsonwt.verify(req.cookies.auth_t, key, (err, user) => {
    if (user) {
      res.clearCookie("auth_t");
      res.clearCookie("email");
      req.logout();
      return;
    } else {
      return res.json({ error: 1 });
    }
  });
});

module.exports = router;
