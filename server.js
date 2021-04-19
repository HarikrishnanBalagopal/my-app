const express = require("express");
const { productValidationRules, validate } = require("./product-validator");

const PORT = 8080;
const PUBLIC_ASSETS_PATH = "build/";
const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum, urna sed sagittis hendrerit, felis ipsum lacinia auctor.`;
const PLACEHOLDER_IMG = "/images/placeholder-image.png";
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

function main() {
    const app = express();

    // middle ware
    app.use(express.json());

    // static routes
    app.use(express.static(PUBLIC_ASSETS_PATH));

    // dynamic routes
    app.get("/api/products", (_, res) => {
        res.json(PRODUCTS);
    });
    app.post("/api/products", productValidationRules, validate, (req, res) => {
        const newProduct = req.body;
        PRODUCTS.push(newProduct);
        console.log("added new product:", newProduct);
        res.sendStatus(201);
    });

    // start the server
    app.listen(PORT, () => console.log(`listing on ${PORT}`));
}

main();
