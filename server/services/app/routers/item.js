const express = require('express')
const ItemController = require('../Controllers/item')
const router = express.Router()

router.get('/', ItemController.getItems)
router.post('/', ItemController.addItems)
router.get('/:id', ItemController.findItemById)
router.put('/:id', ItemController.editItems)
router.delete('/:id', ItemController.deleteItems)
module.exports = router