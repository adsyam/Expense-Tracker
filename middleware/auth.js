const jsonwebtoken = require("jsonwebtoken")

const auth = (req, res, next) => {
//   console.log(req.headers)

  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "")

    const JWT_PAYLOAD = jsonwebtoken.verify(accessToken, process.env.JWT_SALT)

    req.user = JWT_PAYLOAD
    
  } catch (e) {
    res.status(401).json({
      status: "failed",
      message: "Unauthorized access!",
    })
    return
  }

  next()
}

module.exports = auth
