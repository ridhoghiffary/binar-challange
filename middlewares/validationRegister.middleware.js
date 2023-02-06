const {
    body,
    validationResult
} = require('express-validator');

const registerSchema = [
    body('full_name')
    .notEmpty().withMessage('Nama tidak boleh kosong!'),
    body('username')
    .notEmpty().withMessage('Username tidak boleh kosong'),
    body('phone')
    .notEmpty().withMessage('No Hp tidak boleh kosong!')
    .isInt().withMessage('No HP harus berupa angka!'),
    body('email')
    .notEmpty().withMessage('Email tidak boleh kosong')
    .isEmail().withMessage('Email anda tidak valid!')
    .normalizeEmail(),
    body('password')
    .notEmpty().withMessage('Masukkan Password anda!')
    .isLength({
        min: 8
    }).withMessage('Password minimal 8 karakter!')
    .isString()
];

const validateRegisterSchema = [
    // Rules
    registerSchema,
    // Response
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            })
        }
        next();
    }
];

module.exports = validateRegisterSchema;