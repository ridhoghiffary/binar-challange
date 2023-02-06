const {
    Items,
    Orders,
} = require('../db/models')
const jwt_decode = require('jwt-decode');
class OrdersController {
    async orderItems(req, res, next) {
        try {
            const token = req.header('token')
            const decoded = jwt_decode(token)
            console.log(req.body.item_id);
            const itemsExist = await Items.findOne({
                where: {
                    id: req.body.item_id
                },
                attributes: ['item_name', 'price', 'id', 'stock']
            })
            if (!itemsExist) {
                return res.status(400).json({
                    message: "Barang tidak tersedia!"
                })
            }
            const orderExist = await Orders.findOne({
                where: {
                    user_id: decoded.id,
                    item_id: itemsExist.id,
                    status: 'Belum dibayar'
                }
            })
            if (!orderExist) {
                if (parseInt(req.body.qty) > parseInt(itemsExist.stock)) {
                    return res.status(400).json({
                        message: "Pesanan anda melebihi stock item!"
                    })
                }
                const orderItems = await Orders.create({
                    item_name: itemsExist.item_name,
                    user_id: decoded.id,
                    item_id: itemsExist.id,
                    qty: req.body.qty,
                    total_price: (req.body.qty * itemsExist.price),
                    status: "Belum dibayar"
                })
                return res.status(200).json({
                    message: 'Barang anda berhasil di pesan, mohon segera lakukan pembayaran!',
                    data: {
                        name: orderItems.name,
                        user_id: orderItems.users_id,
                        items_id: orderItems.items_id,
                        qty: orderItems.qty,
                        total_price: orderItems.total_price,
                        status: 'Belum dibayar'
                    }
                })
            }

        } catch (error) {
            next(error)
        }
    }
    async payOrder(req, res, next) {
        const token = req.header('token')
        const decoded = jwt_decode(token)
        const {
            balance
        } = req.body
        const orderExist = await Orders.findOne({
            where: {
                user_id: decoded.id,
                status: 'Belum dibayar'
            },
            attributes: ['total_price']
        })
        console.log(orderExist);
        console.log("tseett");
        if (!orderExist) {
            console.log("tst");
            return res.status(400).json({
                message: "Tidak ada item yang dipesan!"
            })
        } else {
            if (balance < orderExist.total_price) {
                return res.status(400).json({
                    message: "Balance anda tidak mencukupi, mohon isi balance anda terlebih dahulu"
                })
            } else if (balance > orderExist.total_price) {
                return res.status(400).json({
                    message: "Balance yang anda masukkan terlalu banyak!"
                })
            } else if (balance == orderExist.total_price) {
                const paidOrder = await Orders.update({
                    status: 'Lunas'
                }, {
                    where: {
                        user_id: decoded.id,
                    }
                })
                return res.status(200).json({
                    message: "Pembelian berhasil"
                })
            } else{
                return res.status(400).json({
                    message: "Masukkan balance anda!"
                })
            }
        }
    }
    async getOrder(req, res, next) {
        try {
            const token = req.header('token')
            const decoded = jwt_decode(token)
            const decode = jwt_decode(token)
            const orderExist = await Orders.findAll({
                where: {
                    user_id: decoded.id,
                }
            })
            if (!orderExist) {
                return res.status(404).json({
                    message: "Order tidak ditemukan!"
                })
            }
            return res.status(200).json({
                message: orderExist
            })
        } catch (error) {
            next(error)
        }
    }
    async deleteOrder(req, res, next) {
        try {
            const token = req.header('token')
            const decoded = jwt_decode(token)
            const checkOrder = await Orders.findOne({
                where: {
                    id: decoded.id
                }
            })
            if (!checkOrder) {
                return res.status(404).json({
                    message: "Order tidak ditemukan!"
                })
            }
            const result = await Orders.destroy({
                where: {
                    id: decoded.id
                }
            })
            return res.status(200).json({
                message: "Item berhasil dihapus!",
            })
        } catch (error) {
            next(error)
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    OrdersController
}