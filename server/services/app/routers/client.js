const express = require('express')
const clientController = require('../Controllers/client')
const router = express.Router()

router.get('/items', clientController.getItems)
router.get('/items/:id', clientController.findItemById)
router.get('/categories', clientController.getAllCategory)
router.get('/categories/:id', clientController.findCategoryById)

module.exports = router