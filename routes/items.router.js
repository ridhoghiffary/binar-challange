const {
    ItemsController
} = require('../controllers/items.controller')
const {
    auth
} = require('../middlewares/auth')
const router = require('express').Router()
const itemController = new ItemsController()
router.get('/get', itemController.getItems)
router.post('/add', auth, itemController.insertItem)
router.put('/update/:id', auth, itemController.updateItem)
router.delete('/delete/:id', auth, itemController.deleteItem)

module.exports = router