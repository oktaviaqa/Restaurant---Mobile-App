const express = require('express')
const UserController = require('../controllers/user')
const router = express.Router()

router.get('/', UserController.getUser )
router.get('/:id', UserController.getUserById)
router.post('/', UserController.createUser)
router.delete('/:id', UserController.deleteUser)
module.exports = router