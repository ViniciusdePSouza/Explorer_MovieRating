require('express-async-errors')
require('dotenv/config')

const AppError = require('./utils/AppError')
const express = require('express')
const runMigrations = require('./database/sqlite/migrations')
const cors = require('cors')
const uploadConfig = require('./config/upload')

const routes = require('./routes')

runMigrations()

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static(uploadConfig.UPLOAD_FOLDER))
app.use(routes)

app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }

    console.log(error)

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    })
})


const PORT = process.env.SERVER_PORT || 3333
app.listen(PORT, () => console.log(`Server is running at Port: ${PORT}`))