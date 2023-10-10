const router = require("express").Router();
const { User } = require("../models/userModels");
const Joi = require("joi");

const bcrypt = require("bcryptjs");

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"), // Corrected the spelling of "Password"
  });
  return schema.validate(data);
};

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body); // Validate the request body
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     if (error)
//       return res.status(400).send({ message: error.details[0].message });

//     const user = await User.findOne({ email: req.body.email });
//     if (!user)
//       return res.status(401).send({ message: "Invalid Email or Password" });
//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );

//     if (!validPassword)
//       return res.status(401).send({ message: "Invalid Email or Password" });

//     const token = user.generateAuthToken();
//     res.status(200).send({ data: token, message: "Logged in successfully" });
//   } catch (error) {
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

// const validate = (data) => {
//   const schema = Joi.object({
//     email: Joi.string().required().label("Email"),
//     password: Joi.string().required().label("PassWord"),
//   });
//   return schema.validate(data);
// };
module.exports = router;
