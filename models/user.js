const { string } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  country_code: {
    type: String,
  },
  accessToken: {
    type: String,
    default: null,
  },
});
module.exports = mongoose.model("user", userSchema);
