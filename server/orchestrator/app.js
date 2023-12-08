if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const {typeDefsUser, resolversUser} = require('./schemas/userType')
const { typeDefsItem, resolversItem} = require('./schemas/itemType')

const server = new ApolloServer({
    typeDefs: [typeDefsUser, typeDefsItem],
    resolvers: [resolversUser, resolversItem],
    introspection: true
});

startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
})
.then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
})
.catch(console.log)
