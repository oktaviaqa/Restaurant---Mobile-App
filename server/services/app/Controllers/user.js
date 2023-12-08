const{ User} = require('../models')
const bcrypt = require('bcryptjs')
const { createToken } = require('../helpers/jwt')
class UserController {
    static async register(req, res, next){
        try {
            const { username, email, password, phoneNumber, address } = req.body
            const response = await User.create({
                username, email, password, role: "admin", phoneNumber, address
            })
            res.status(201).json({
                username: response.username,
                email: response.email
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next){
        try {
            const { email, password } = req.body
            const admin = await User.findOne({
                where: {email}
            })
            if (!admin) {
                throw {name: 'Invalid password or username'}
            } else {
                const checkPw = bcrypt.compareSync(password, admin.password)
                if (checkPw) {
                    const payload = { id: admin.id, email: admin.email}
                    const access_token = createToken(payload)

                    res.status(200).json({access_token})
                } else {
                    throw {name : 'Invalid password or username'}
                }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController