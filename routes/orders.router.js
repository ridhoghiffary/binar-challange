const { OrdersController } = require('../controllers/orders.controller')
const {
    auth
} = require('../middlewares/auth')
const OrderController = new OrdersController()
const router = require('express').Router()

router.post('', auth, OrderController.orderItems)
router.patch('', auth, OrderController.payOrder)
router.get('', auth, OrderController.getOrder)
router.delete('', auth, OrderController.deleteOrder)

module.exports = router