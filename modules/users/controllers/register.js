const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwtManager = require("../../../managers/jwtManager")
const emailManager = require("../../../managers/emailManager")

const register = async (req, res) => {
  const usersModel = mongoose.model("users")

  const { name, email, password, confirm_password, balance } = req.body

  // Validations...
  if (!name) throw "Name must be provided!"
  if (!email) throw "Email must be provided!"
  if (!password) throw "Password must be provided!"
  if (password.length < 5) throw "Password must be atleast 5 characters long."

  if (password !== confirm_password)
    throw "Confirm Password does not match the password."

  const emailAlreadyExists = await usersModel.findOne({
    email: email,
  })

  if (emailAlreadyExists) throw "This email already exists!"

  const hashedPassword = await bcrypt.hash(password.toString(), 12)

  const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  })

  const accessToken = jwtManager(createdUser)

  await emailManager(
    createdUser.email,
    "Welcome to expense tracker. We hope you can manage your expenses easily from our platform",
    "<h1>Welcome to expense tracker.</h1> <br/><br/> We hope you can manage your expenses easily from our platform",
    "Welcome to Expense Tracker!"
  )

  res.status(201).json({
    status: "User registered successfully!",
    accessToken: accessToken,
  })
}

module.exports = register
