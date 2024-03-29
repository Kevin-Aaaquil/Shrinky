console.log();

require('dotenv').config();
const chalk = require('chalk');

const MongoClient = require('mongodb').MongoClient;
let db;
const connect = (async () => {
    try {
        const client = await MongoClient.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ignoreUndefined: true
        });
        console.log(chalk.magenta("databse connected"));
        return client.db();
    }
    catch (err) {
        console.log(err);
        process.exit(-1);
    }
})

const DB = async () => {
    if (!db) {
        db = await connect();
    }
    else {
    }
    return db;
}


module.exports = DB;