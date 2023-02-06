const {
    Items
} = require('../db/models')
const jwt_decode = require('jwt-decode');
class ItemsController {
    async getItems(req, res, next) {
        const data = await Items.findAll({})
        return res.status(200).json(data)
    }

    async insertItem(req, res, next) {
        try {
            const token = req.header('token')
            const decoded = jwt_decode(token)
            const result = await Items.create({
                item_name: req.body.item_name,
                price: req.body.price,
                stock: req.body.stock,
                sku: req.body.sku,
                user_id: decoded.id
            });

            return res.status(201).json(result);
        } catch (error) {
            next(error)
        }
    }
    async updateItem(req, res, next) {
        try {
            const id = req.params.id;
            const data = {
                item_name: req.body.item_name,
                price: req.body.price,
                stock: req.body.stock,
                sku: req.body.sku,
            }
            const checkItem = Items.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!checkItem) {
                return res.status(404).json({
                    message: "Item Tidak ditemukan!"
                })
            }
            await Items.update(data, {
                where: {
                    id: id
                }
            })
            return res.status(200).json({
                code: 200,
                message: "Item berhasil di update!"
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteItem(req, res, next) {
        try {
            const id = req.params.id;
            const checkItem = Items.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!checkItem) {
                return res.status(404).json({
                    message: "Item Tidak ditemukan!"
                })
            }
            const result = await Items.destroy({
                where: {
                    id:id
                }
            })
            return res.status(200).json({
                code: 200,
                message: "Item berhasil dihapus!"
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = {
    ItemsController
}