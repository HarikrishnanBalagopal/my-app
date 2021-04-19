const express = require("express");
const { productValidationRules, validate } = require("./product-validator");
const {
    getProducts,
    updateProduct,
    deleteProduct,
    createProduct,
} = require("./database");

const PORT = 8080;
const PUBLIC_ASSETS_PATH = "build/";
const PLACEHOLDER_IMG = "/images/placeholder-image.png";

async function addInitialSetOfProducts() {
    const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum, urna sed sagittis hendrerit, felis ipsum lacinia auctor.`;
    const PRODUCTS = [
        {
            id: 1,
            name: "product 1",
            description: DESCRIPTION,
            price: 10,
            quantity: 100,
            image: PLACEHOLDER_IMG,
        },
        {
            id: 2,
            name: "product 2",
            description: DESCRIPTION,
            price: 10,
            quantity: 100,
            image: PLACEHOLDER_IMG,
        },
        {
            id: 3,
            name: "product 3",
            description: DESCRIPTION,
            price: 10,
            quantity: 100,
            image: PLACEHOLDER_IMG,
        },
        {
            id: 4,
            name: "product 4",
            description: DESCRIPTION,
            price: 10,
            quantity: 100,
            image: PLACEHOLDER_IMG,
        },
    ];
    const result = await getProducts();
    if (result.length) {
        return console.log(
            `There are already ${result.length} products in the database.`
        );
    }
    for (const product of PRODUCTS) {
        await createProduct(product);
    }
    console.log(
        `Added the initial set of ${PRODUCTS.length} products to the database.`
    );
}

async function main() {
    // database
    await addInitialSetOfProducts();
    console.log("connected to mongodb");

    const app = express();

    // middle ware
    app.use(express.json());

    // static routes
    app.use(express.static(PUBLIC_ASSETS_PATH));

    // dynamic routes
    app.get("/api/products", async (_, res) => {
        const products = await getProducts();
        res.json(products);
    });
    app.post(
        "/api/products",
        productValidationRules,
        validate,
        async (req, res) => {
            const newProduct = req.body;
            newProduct.image = PLACEHOLDER_IMG;
            await createProduct(newProduct);
            console.log("added new product:", newProduct);
            res.sendStatus(201);
        }
    );
    app.put(
        "/api/products",
        productValidationRules,
        validate,
        async (req, res) => {
            const newProduct = req.body;
            newProduct.image = PLACEHOLDER_IMG;
            await updateProduct(newProduct);
            console.log("updated the product:", newProduct);
            res.sendStatus(200);
        }
    );
    app.delete("/api/products/:id", async (req, res) => {
        await deleteProduct(req.params.id);
        console.log("deleted the product with id:", req.params.id);
        res.sendStatus(200);
    });
    // start the server
    app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
}

main();
