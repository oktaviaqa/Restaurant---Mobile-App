const axios = require('axios')
const Redis = require('ioredis')
const base_url = process.env.USER_SERVICE_URL
const redis = new Redis("redis://default:iM93cuXQqPpa5HDuMgwEuT3p7xHIU769@redis-14171.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:14171")
class UserController {
    static async getUser(req, res, next) {
        try {
            const usersCache = await redis.get('users')
            if (usersCache) {
                const data = JSON.parse(usersCache)
                res.status(200).json(data)
            } else {
                const { data } = await axios.get(base_url)
                const value = JSON.stringify(data)
                await redis.set('users', value)
                res.status(200).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    static async getUserById(req, res, next) {
        try {
            const { id } = req.params
            const { data } = await axios.get(base_url + id)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async createUser(req, res, next){
        try {
            const {  username, email, password, role, phoneNumber, address } = req.body
            const { data } = await axios.post(base_url,
                { username, email, password, role, phoneNumber, address})
                await redis.del('users')
                res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser(req, res, next){
        try {
            const { id } = req.params
            const deleteUser = await axios.delete(base_url + id)
            await redis.del('users')
            res.status(200).json({message: 'successfully deleted'})
        } catch (error) {
            next (error)
        }
    }
}

module.exports = UserController