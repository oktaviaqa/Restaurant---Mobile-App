if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
const { connect } = require('./config/mongo');
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => res.json("Welcome to our server!"))
app.use('/users', userRoutes)
app.use(errorHandler)

connect()
.then(() => {
    app.listen(port, () => {
        console.log('i love u ' + port);
    })
})