const { body, validationResult } = require("express-validator");

const productValidationRules = [
    body("id").isString().withMessage("id must be a string"),
    body("name").isString().withMessage("name must be a string"),
    body("description").isString().withMessage("description must be a string"),
    body("price")
        .isNumeric({ no_symbols: true })
        .withMessage("price must be a positive number")
        .toFloat(),
    body("quantity")
        .isNumeric({ no_symbols: true })
        .withMessage("quantity must be a positive number")
        .toInt(),
];

const validate = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) return next();
    const errors = result.errors.map((err) => ({ [err.param]: err.msg }));
    return res.status(422).json({ errors });
};

module.exports = { productValidationRules, validate };
