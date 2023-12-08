const { ObjectId, Admin } = require('mongodb');
const { getDb } = require('../config/mongo')
const bcrypt = require('bcryptjs')

class User {
    static getCollection() {
        return getDb().collection('users')
    }

    static async findAll() {
        try {
            const users = await User.getCollection().find().toArray()
            return users
        } catch (error) {
            console.log(error);
        }
    }

    static async findByPk(id) {
        try {
            const findUsers = await User.getCollection().findOne({
                _id: new ObjectId(id)
            })
            return findUsers
        } catch (error) {
            console.log(error);
        }
    }

    static async create({ username, email, password, role, phoneNumber, address }) {
        try {
            const hashPassword = bcrypt.hashSync(password, 10)
            const newUsers = await User.getCollection().insertOne({ username, email, password: hashPassword, role: 'admin', phoneNumber, address })
            return newUsers
        } catch (error) {
            console.log(error);
        }
    }

    static async destroy(id) {
        try {
            const deleteUser = await User.getCollection().deleteOne({
                _id: new ObjectId(id)
            })
            return deleteUser
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = User