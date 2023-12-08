const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const cors = require('cors')
const route = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use(route)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`REST API listening on ${port}`);
})