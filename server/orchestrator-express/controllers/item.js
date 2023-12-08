const axios = require('axios')
const Redis = require('ioredis')
const base_url = process.env.APP_SERVICE_URL
const user_url = process.env.USER_SERVICE_URL
const redis = new Redis("redis://default:iM93cuXQqPpa5HDuMgwEuT3p7xHIU769@redis-14171.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:14171")

class ItemController {
    static async getItem(req, res, next) {
        try {
            const itemCache = await redis.get('items')
            if (itemCache) {
                const data = JSON.parse(itemCache)
                res.status(200).json(data)
            } else {
                const { data } = await axios.get(base_url)
                const value = JSON.stringify(data)
                await redis.set('items', value)
                res.status(200).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    static async getItemById(req, res, next){
        try {
            const { id } = req.params
            const {data: item} = await axios.get(base_url + id)
            const {data: user} = await axios.get(user_url + item.authorId)
            item.User = user
            res.status(200).json(item)
        } catch (error) {
            next(error)
        }
    }

    static async createItem(req, res, next){
        try {
            const { name, description, price, imgUrl, authorId, categoryId, ingredients } = req.body
            const { data } = await axios.post(base_url,
                { name, description, price, imgUrl, authorId, categoryId, ingredients })
            await redis.del('items')
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async editItem(req, res, next){
        try {
            const { id } = req.params
            const { name, description, price, imgUrl, categoryId } = req.body
            const {data} = await axios.put(base_url + id, {
                name, description, price, imgUrl, categoryId
            })
            await redis.del('items')
            res.status(200).json(   )
        } catch (error) {
            next(error)
        }
    }

    static async deleteItem(req, res, next){
        try {
            const { id } = req.params
            await axios.delete(base_url + id)
            await redis.del('items')
            res.status(200).json({message: 'successfully deleted'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ItemController