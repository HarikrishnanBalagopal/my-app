const { MongoClient, ObjectID } = require("mongodb");

const DATABASE_NAME = "products-db";
const COLLECTION_NAME = "products";
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

async function createProduct(product) {
    const client = await getDatabaseClient();
    return client
        .db(DATABASE_NAME)
        .collection(COLLECTION_NAME)
        .insertOne(product);
}

async function getProducts() {
    const client = await getDatabaseClient();
    return client
        .db(DATABASE_NAME)
        .collection(COLLECTION_NAME)
        .find()
        .toArray();
}

async function updateProduct(product) {
    const client = await getDatabaseClient();
    return client
        .db(DATABASE_NAME)
        .collection(COLLECTION_NAME)
        .updateOne({ _id: ObjectID(product._id) }, { $set: product });
}

async function deleteProduct(id) {
    const client = await getDatabaseClient();
    return client
        .db(DATABASE_NAME)
        .collection(COLLECTION_NAME)
        .deleteOne({ _id: ObjectID(id) });
}

module.exports = {
    getDatabaseClient,
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct,
};
