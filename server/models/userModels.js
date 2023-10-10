const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexty = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, // Corrected spelling of "required"
  },
  lastName: {
    type: String,
    required: true, // Corrected spelling of "required"
  },
  email: {
    type: String,
    required: true, // Corrected spelling of "required"
  },
  password: {
    type: String,
    required: true, // Corrected spelling of "required"
  },
});

userSchema.methods.generateAuthToken = function () {
  // Use a regular function to access 'this'
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("User", userSchema); // Corrected spelling of "model"

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().required().label("Email"),
    password: passwordComplexty().required().label("PassWord"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
