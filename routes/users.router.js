const router = require('express').Router()
const {
UsersController
} = require('../controllers/users.controller')
const validateRegisterSchema = require('../middlewares/validationRegister.middleware')
const validateLoginSchema = require('../middlewares/validationLogin.middleware')

const UserController = new UsersController()
router.post("/login", validateLoginSchema, UserController.login);
router.post("/register", validateRegisterSchema, UserController.register);


module.exports = router