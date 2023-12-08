const User = require('../models/user')
class UserController {
    static async getUser(req, res, next){
        try {
            const users = await User.findAll()
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

    static async findUserById(req, res, next){
        try {
            const { id } = req.params
            const users = await User.findByPk(id)
            if (!users) {
                throw {name: 'not found'}
            }
            console.log(users);
            res.status(200).json(users)
        } catch (error) {
            next (error)
        }
    }

    static async createUser(req, res, next){
        try {
            const { username, email, password, role, phoneNumber, address } = req.body
            const newUser = await User.create({
                username, email, password, role  , phoneNumber, address
            })
            res.status(201).json({message: 'user added successfully'})
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser(req, res, next){
        try {
            const { id } = req.params
            const deleteUser = await User.destroy(id)
            if (!deleteUser) {
                throw {name: 'not found'}
            }
            res.status(200).json({message: 'user successfully to deleted'})
        } catch (error) {
            next (error)
        }
    }
}

module.exports = UserController