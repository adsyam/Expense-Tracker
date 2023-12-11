const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const jwtManager = require("../../../managers/jwtManager")

const login = async (req, res) => {
  const usersModel = mongoose.model("users")

  const { email, password } = req.body

  const existingUser = await usersModel.findOne({
    email: email,
  })

  if (!existingUser) throw "This email does not exist in the system!"

  const isPasswordMatch = await bcrypt.compare(password, existingUser.password)

  if (!isPasswordMatch) throw "Email and password does not match!"

  const accessToken = jwtManager(existingUser)

  res.status(200).json({
    status: "success",
    message: "User logged in successfully!",
    accessToken: accessToken,
  })
}

module.exports = login
