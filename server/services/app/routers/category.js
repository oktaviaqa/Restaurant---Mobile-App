const express = require('express')
const CategoryController = require('../Controllers/category')
const router = express.Router()

router.get('/', CategoryController.getCategory)
router.post('/', CategoryController.addCategory)
router.get('/:id', CategoryController.findCategoryById)
router.put('/:id', CategoryController.editCategory)
router.delete('/:id', CategoryController.deleteCategory)

module.exports = router