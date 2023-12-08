const { User } = require('../models')
const {verifyToken }= require('../helpers/jwt.js')

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw { name: 'unauthenticated'}
        }
        const decode = verifyToken(access_token)
        const findUser = await User.findByPk(decode.id)
        if (!findUser) {
            throw { name: 'unauthenticated'}
        }
        req.user = {
            id: findUser.id,
            email: findUser.email,
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication