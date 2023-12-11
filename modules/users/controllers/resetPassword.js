const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const emailManager = require("../../../managers/emailManager")

const resetPassword = async (req, res) => {
  const usersModel = mongoose.model("users")

  const { email, new_password, reset_code } = req.body

  if (!email) throw "Email is required!"
  if (!new_password) throw "Please provide the new password"
  if (!reset_code) throw "Reset code is required!"
  if (new_password.length < 5)
    throw "Password mus be atleast 5 characters long."

  const getUserWithResetCode = await usersModel.findOne({
    email: email,
    reset_code: reset_code,
  })

  if (!getUserWithResetCode) throw "Reset code does not match!"

  const hashedPassword = await bcrypt.hash(new_password.toString(), 12)

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      password: hashedPassword,
      reset_code: "",
    },
    {
      runValidators: true,
    }
  )

  await emailManager(
    email,
    "Your password has been reset successfully. If that is not you, please contact us!",
    "Your password has been reset successfully. If that is not you, please contact us!",
    "Password reset succesfully!"
  )

  res.status(200).json({
    status: "success",
    message: "Password has been reset successfully!",
  })
}

module.exports = resetPassword
