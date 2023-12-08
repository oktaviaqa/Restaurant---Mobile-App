const bcrypt = require('bcryptjs')
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://oktaviaqa:8Ec2t3owCW5UJjeN@cluster0.q9bryfg.mongodb.net/";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('restaurant-app');
        const User = db.collection('users')

        const data = require('./data/data.json').map(el => {
            el.password = bcrypt.hashSync(el.password, 10)
            return el
        })
        await User.insertMany(data)
        const users = await User.find().toArray()
        console.log(users);
    } catch (error) {
        console.log(error);
    }
}

run()