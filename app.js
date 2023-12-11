require("express-async-errors")

// Third Party imports...
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

require("dotenv").config()

// Middleware / Handler imports...
const errorHandler = require("./handlers/errorHandler")
const userRoutes = require("./modules/users/users.routes")
const transactionRoutes = require("./modules/transactions/transactions.routes")

const app = express()

// Cors middleware
app.use(cors())

const PORT = 8000

mongoose
  .connect(process.env.MONGO_CONNECTION_KEY, {})
  .then(() => {
    console.log("Connected to MongoDB!")
  })
  .catch(() => {
    console.log("Connection to MongoDB has failed!")
  })

// Models...
require("./models/users.model")
require("./models/transactions.model")

// Middleware / Handlers...
app.use(express.json())

// Route Handler...
app.use("/api/users", userRoutes)
app.use("/api/transactions", transactionRoutes)

// Fallback Route
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "Route not found!",
  })
})

// Middleware for error handling
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started at: ${PORT}`)
})
