const Redis = require('ioredis')
const redis = new Redis("redis://default:iM93cuXQqPpa5HDuMgwEuT3p7xHIU769@redis-14171.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:14171")
const axios = require('axios')
const base_url = "http://localhost:4001/users/"
const typeDefsUser = `#graphql
type User {
    _id: ID
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
}

type Query {
    users: [User],
    usersById(id: ID!): User
}

input NewUser {
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
}

type Message {
    message: String
}

type Mutation {
    createNewUser(content: NewUser!): Message
    deleteUser(id: ID!): Message
}
`;

const resolversUser = {
    Query: {
        users: async () => {
            try {
                const usersCache = await redis.get('users')
                if (usersCache) {
                    const data = JSON.parse(usersCache)
                    return data
                } else {
                    const { data } = await axios.get(base_url)
                    const value = JSON.stringify(data)
                    await redis.set('users', value)
                    return data
                }
            } catch (error) {
                throw error
            }
        }, 
        usersById: async (_, { id }) => {
            try {
                const { data } = await axios.get(base_url + id)
                return data
            } catch (error) {
                throw error
            }
        }
    },
    Mutation: {
        createNewUser: async(root, { content }) => {
            try {
                const { data } = await axios.post(base_url, content)
                await redis.del('users')
                return data 
            } catch (error) {
                throw error
            }
        },
        deleteUser: async(_, { id }) => {
            try {
               const { data } = await axios.delete(base_url + id)
               await redis.del('users')
               return data
            } catch (error) {
                throw error
            }
        }
    }

}
module.exports = {typeDefsUser, resolversUser}
