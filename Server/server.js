const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const connectDB = require('./src/mongo')
require('dotenv').config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({ credentials: true , origin: 'http://localhost:5173' }))
app.use(cookieParser())
app.use(fileUpload())
app.use(express.static('./dist'))
app.use('/uploads', express.static(path.join(__dirname, 'dist', 'uploads')))

// Routes
const recipeRoutes = require('./Routes/RecipeRoutes')
const userRoutes = require("./Routes/UserRoutes")
app.use('/api/v1/recipe', recipeRoutes)
app.use('/api/v1/users', userRoutes)

// Connect to Database and Start Server
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.error('Failed to connect to the database or start the server:', error)
  }
}

startServer()
