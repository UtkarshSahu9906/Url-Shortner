const USER = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const {setUser,getUserkk} = require('../service/auth');

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await USER.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await USER.findOne({ email, password });
  if (!user)
    return res.render("login", { error: "Invalid Username or Password" });
  const sessionId = uuidv4();
  return res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
