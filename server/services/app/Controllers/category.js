const { Category } = require('../models')
class CategoryController {
    static async getCategory(req, res, next){
        try {
            const category = await Category.findAll()
            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    }

    static async addCategory(req, res, next){
        try {
            const { name } = req.body
            const addCategory = await Category.create({
                name
            })
            res.status(201).json(addCategory)
        } catch (error) {
            next(error)
        }
    }

    static async findCategoryById(req, res, next){
        try {
            const { id } = req.params
            const findCategory = await Category.findByPk(id)
            res.status(200).json(findCategory)
        } catch (error) {
            next(error)
        }
    }
    static async editCategory(req, res, next){
        try {
            const { id } = req.params
            const { name } = req.body
            const editCategory = await Category.update({
                name
            }, {where: { id }, returning: true})
            res.status(200).json(editCategory)
        } catch (error) {
            next(error)
        }
    }

    static async deleteCategory(req, res, next){
        try {
            const { id } = req.params
            const deleteCategory = await Category.destroy({
                where: { id }
            })
            res.status(200).json({ message: 'Category deleted successfully'})
        } catch (error) {
            next(error)
        }
    }

}

module.exports = CategoryController