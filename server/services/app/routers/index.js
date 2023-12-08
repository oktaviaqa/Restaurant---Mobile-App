const express = require('express')
const router = express.Router()

const itemRoutes = require('./item')
const categoryRoutes = require('./category')
const clientRoutes = require('./client')
const UserController = require('../Controllers/user')
// const authentication = require('../middlewares/authentication')

router.post('/login', UserController.login)
router.use('/client', clientRoutes)

// router.use(authentication)

router.post('/register', UserController.register)
router.use('/items', itemRoutes)
router.use('/categories', categoryRoutes)



module.exports = router