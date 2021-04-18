const express = require("express");
const PORT = 8080;
const PUBLIC_ASSETS_PATH = "build/";
const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum, urna sed sagittis hendrerit, felis ipsum lacinia auctor.`;
const placeholder_img = "/images/placeholder-image.png";
const PRODUCTS = [
    { id: 1, name: "product 1", description, image: placeholder_img },
    { id: 2, name: "product 2", description, image: placeholder_img },
    { id: 3, name: "product 3", description, image: placeholder_img },
    { id: 4, name: "product 4", description, image: placeholder_img },
];

function main() {
    const app = express();
    app.use(express.static(PUBLIC_ASSETS_PATH));
    app.get("/api/products", (req, res) => {
        res.json(PRODUCTS);
    });
    app.listen(PORT, () => console.log(`listing on ${PORT}`));
}

main();
