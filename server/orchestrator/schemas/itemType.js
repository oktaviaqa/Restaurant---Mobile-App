const Redis = require('ioredis')
const redis = new Redis("redis://default:iM93cuXQqPpa5HDuMgwEuT3p7xHIU769@redis-14171.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:14171")
const axios = require('axios')
const item_url = "http://localhost:4002/items/"
const user_url = "http://localhost:4001/users/"
const typeDefsItem = `#graphql
type Item {
    id: ID
    name: String
    description: String
    price: Int
    imgUrl: String
    authorId: String
    categoryId: Int
    Category: Category
    Ingredients: [ Ingredients ]
    User: User
}

type Category {
    id: ID
    name: String
}

type Ingredients {
    id: ID
    itemId: Int
    name: String
}

type Query {
    items: [Item]
    detailItem(id: ID!): Item
}

input NewItem {
    name: String
    description: String
    price: Int
    imgUrl: String
    authorId: String
    categoryId: Int
    ingredients: [NewIngredient]
}

input NewIngredient {
    itemId: Int
    name: String
}

input EditItem {
    name: String
    description: String
    price: Int
    imgUrl: String
    authorId: String
    categoryId: Int
}

type Message {
    message: String
}

type Mutation {
    createNewItem(content: NewItem!): Message
    updateItem(content: EditItem!, id: ID!): Message
    deleteItem(id: ID!): Message
}
`

const resolversItem = {
    Query: {
        items: async () => {
            try {
                const itemCache = await redis.get('items')
                if (itemCache) {
                    const data = JSON.parse(itemCache)
                    return data
                } else {
                    const { data } = await axios.get(item_url)
                    const value = JSON.stringify(data)
                    await redis.set('items', value)
                    return data
                }
            } catch (error) {
                console.log(error);
                throw error
            }
        },
        detailItem: async (_, { id }) => {
            try {
                const { data: item } = await axios.get(item_url + id)
                const { data: user } = await axios.get(user_url + item.authorId)
                item.User = user
                return item
            } catch (error) {
                throw error
            }
        }
    },
    Mutation: {
        createNewItem: async(root, { content }) => {
            try {
                const { data } = await axios.post(item_url, content)
                await redis.del('items')
                return data
            } catch (error) {
                throw error
            }
        },
        updateItem: async(_, { content, id }) => {
            try {
                const { data } = await axios.put(item_url + id, content)
                await redis.del('items')
                return data
            } catch (error) {
                throw error
            }
        },
        deleteItem: async(_, { id }) => {
            try {
                const { data } = await axios.delete(item_url + id)
                await redis.del('items')
                return data
            } catch (error) {
                throw error
            }
        }
    }
}

module.exports = { typeDefsItem, resolversItem }