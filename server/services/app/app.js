if (process.env.NODE_ENV !== "production") {
    // cuma dipakai ditahap development testing
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 4002
const cors = require('cors')
const routers = require('./routers')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use('/', routers)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`REST API listening on ${port}`);
})