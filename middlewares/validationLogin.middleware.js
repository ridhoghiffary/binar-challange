const {body, validationResult} = require('express-validator');

const loginSchema = [
    body('email')
        .notEmpty().withMessage('Email tidak boleh kosong!')
        .isEmail().withMessage('Email tidak valid!')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password tidak boleh kosong!')
        .isLength({ min: 8 })
        .isString()
];

const validateLoginSchema = [
    // Rules
    loginSchema,
    // Response
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()})
        }
        next();
    }
];

module.exports = validateLoginSchema;