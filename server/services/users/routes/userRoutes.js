const express = require('express')
const UserController = require('../controllers/users')
const router = express.Router()

router.get('/', UserController.getUser )
router.get('/:id', UserController.findUserById )
router.post('/', UserController.createUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router