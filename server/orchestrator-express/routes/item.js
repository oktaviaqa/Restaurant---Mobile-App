const express = require('express')
const ItemController = require('../controllers/item')
const router = express.Router()

router.get('/', ItemController.getItem)
router.get('/:id', ItemController.getItemById)
router.put('/:id', ItemController.editItem)
router.post('/', ItemController.createItem)
router.delete('/:id', ItemController.deleteItem)
module.exports = router