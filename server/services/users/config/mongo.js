const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://oktaviaqa:8Ec2t3owCW5UJjeN@cluster0.q9bryfg.mongodb.net/";
const client = new MongoClient(uri);

let db;
async function connect() {
    try {
        await client.connect();
        db = client.db('restaurant-app');
        return db
    } catch (error) {
        console.log('Error connected to server',error);
    }
}

function getDb() {
    return db
}

module.exports = { connect, getDb }