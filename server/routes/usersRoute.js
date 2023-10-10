const router = require("express").Router();

const { User, validate } = require("../models/userModels");
// const User
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User With Given Email aleady exist!" });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hasPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hasPassword }).save();
    res.status(201).send({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
