const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
let client = null;

async function getDatabaseClient() {
    if (!client) {
        client = await new MongoClient(url, {
            useUnifiedTopology: true,
        }).connect();
    }
    return new Promise((resolve) => resolve(client));
}

module.exports = { getDatabaseClient };
