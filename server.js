const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const {
    productValidationRules,
    loginValidationRules,
    validate,
} = require("./validator");
const {
    getProducts,
    updateProduct,
    deleteProduct,
    createProduct,
} = require("./database");

const PORT = 8080;
const PLACEHOLDER_IMG = "/images/placeholder.png";
const PUBLIC_ASSETS_PATH = path.join(__dirname, "build/");
const INDEX_HTML = path.join(PUBLIC_ASSETS_PATH, "index.html");
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "1234";

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

const loggedInSessions = {};
function isLoggedIn(req) {
    return (
        req.cookies &&
        req.cookies.session &&
        req.cookies.session in loggedInSessions
    );
}

async function main() {
    // logged in sessions

    // database
    await addInitialSetOfProducts();
    console.log("connected to mongodb");

    const app = express();

    // middle ware
    app.use(express.json());
    app.use(cookieParser());

    // static routes
    app.use(express.static(PUBLIC_ASSETS_PATH));

    // dynamic routes
    app.post("/api/login", loginValidationRules, validate, (req, res) => {
        if (isLoggedIn(req)) {
            console.log(
                "trying to login again. deleting old session:",
                req.cookies.session
            );
            delete loggedInSessions[req.cookies.session];
        }
        console.log("trying to login with credentials:", req.body);
        if (
            req.body.username !== ADMIN_USERNAME ||
            req.body.password !== ADMIN_PASSWORD
        ) {
            return res
                .status(403)
                .json({ errors: [{ error: "invalid credentials" }] });
        }
        const session = uuidv4();
        const expires = new Date(Date.now() + 8 * 3600000); // cookie will be removed after 8 hours
        loggedInSessions[session] = expires;
        res.status(200)
            .cookie("session", session, { expires })
            .json({ success: true });
    });
    app.post("/api/logout", (req, res) => {
        if (!isLoggedIn(req))
            return res
                .status(403)
                .json({ errors: [{ error: "you are not logged in" }] });
        delete loggedInSessions[req.cookies.session];
        console.log("logged out of session:", req.cookies.session);
        return res.status(200).clearCookie("session").json({ success: true });
    });
    app.get("/api/products", async (_, res) => {
        const products = await getProducts();
        res.json(products);
    });
    // create
    app.post(
        "/api/products",
        productValidationRules,
        validate,
        async (req, res) => {
            if (!isLoggedIn(req))
                return res.status(403).json({
                    errors: [
                        {
                            error:
                                "you are not authorized to perform this action",
                        },
                    ],
                });

            const newProduct = req.body;
            newProduct.image = PLACEHOLDER_IMG;
            await createProduct(newProduct);
            console.log("added new product:", newProduct);
            res.sendStatus(201);
        }
    );
    // update
    app.put(
        "/api/products",
        productValidationRules,
        validate,
        async (req, res) => {
            if (!isLoggedIn(req))
                return res.status(403).json({
                    errors: [
                        {
                            error:
                                "you are not authorized to perform this action",
                        },
                    ],
                });

            const newProduct = req.body;
            newProduct.image = PLACEHOLDER_IMG;
            await updateProduct(newProduct);
            console.log("updated the product:", newProduct);
            res.sendStatus(200);
        }
    );
    // delete
    app.delete("/api/products/:id", async (req, res) => {
        if (!isLoggedIn(req))
            return res.status(403).json({
                errors: [
                    { error: "you are not authorized to perform this action" },
                ],
            });
        if (
            !req.params ||
            !("id" in req.params) ||
            typeof req.params.id !== "string"
        ) {
            return res.status(422).json({
                errors: [{ id: "id parameter is missing or invalid" }],
            });
        }
        await deleteProduct(req.params.id);
        console.log("deleted the product with id:", req.params.id);
        res.sendStatus(200);
    });

    // default route
    app.get("*", async (_, res) => res.sendFile(INDEX_HTML));

    // start the server
    app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
}

main();
