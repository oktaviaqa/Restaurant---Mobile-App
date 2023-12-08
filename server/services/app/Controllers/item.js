const { Item, User, Category, Ingredient, sequelize } = require('../models')
class ItemController {
    static async getItems (req, res, next){
        try {
            const getItems = await Item.findAll({
                include: [Category, Ingredient]
            })
            res.status(200).json(getItems)
        } catch (error) {
            next(error)
        }
    }

    static async addItems (req, res, next){
        const t = await sequelize.transaction();
        try {
            const { name, description, price, imgUrl, authorId, categoryId, ingredients} = req.body
            const item = await Item.create({
                name, description, price, imgUrl, authorId, categoryId
            }, { transaction: t})

            const ingredientData = ingredients.map(el => {
                el.itemId = item.id
                return el
            })

            await Ingredient.bulkCreate(ingredientData, { transaction: t });

            await t.commit()
            res.status(201).json({ message: 'Items added successfully' });
        } catch (error) {
            await t.rollback()
            next(error)
        }
    }

    static async findItemById(req, res, next){
        try {
            const { id } = req.params
            const findItem = await Item.findByPk(id, {
                include: [Category, Ingredient]
            })
            if (!findItem) {
                throw {name: 'not found'}
            }
            res.status(200).json(findItem)
            
        } catch (error) {
            next(error);
        }
    }

    static async editItems (req, res, next){
        try {
            const { id } = req.params
            const { name, description, price, imgUrl, categoryId } = req.body
            const item = await Item.update({
                name, description, price, imgUrl, categoryId
            }, {where: {id}, returning: true})

            res.status(200).json({message: 'succesfully edited item'})
        } catch (error) {
            next(error)
        }
    }

    static async deleteItems(req, res, next){
        try {
            const { id } = req.params
            const item = await Item.destroy({
                where: {id}
            })
            if (!item) {
                throw {name: 'not found'}
            }
            res.status(200).json({ message: 'item deleted successfully'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ItemController