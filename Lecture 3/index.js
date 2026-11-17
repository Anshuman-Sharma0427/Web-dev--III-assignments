
const express = require("express")
require("dotenv").config()

const app = express()

const db = require("./config/db")
const productRoutes = require("./routes/productRoutes")
const { errorMiddleware } = require("./middleware/errorMiddleware")

// Middleware
app.use(express.json())

// Database Connection
db()

// Routes
app.use("/api/products", productRoutes)

// Error Handling
app.use(errorMiddleware)

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})
