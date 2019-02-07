const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  }
});

module.exports = Person = mongoose.model("myPerson", PersonSchema);
