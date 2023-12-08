const { Item, User, Category, Ingredient, sequelize } = require('../models')
class clientController{
    static async getItems (req, res, next){
        try {
            const getItem = await Item.findAll({
                include: [Category, Ingredient, User]
            })
            res.status(200).json(getItem)
        } catch (error) {
            next(error)
        }
    }

    static async findItemById(req, res, next){
        try {
            const { id } = req.params
            const findItem = await Item.findByPk(id, {
                include: [Category, Ingredient, User]
            })
            if (!findItem) {
                throw {name: 'not found'}
            }
            res.status(200).json(findItem)
            
        } catch (error) {
            next(error);
        }
    }

    static async getAllCategory(req, res, next){
        try {
            const category = await Category.findAll({})
            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    }

    static async findCategoryById(req, res, next){
        try {
            const { id } = req.params
            const findCategory = await Category.findByPk(id, {
                include: Item
            })
            res.status(200).json(findCategory)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = clientController