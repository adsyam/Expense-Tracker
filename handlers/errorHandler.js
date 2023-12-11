const errorHandler = (err, req, res, next) => {
  if (err) {
    if (!err.message) {
      res.status(400).json({
        status: "failed",
        error: err,
      })
    } else {
      res.status(400).json({
        status: "failed",
        error: err.message,
      })
    }
  } else {
    next()
  }
}

module.exports = errorHandler

