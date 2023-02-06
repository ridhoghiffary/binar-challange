const express = require('express')
const userRouter = require('./routes/users.router')
const itemsRouter = require('./routes/items.router')
const orderRouter = require('./routes/orders.router')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', userRouter)
app.use('/items', itemsRouter)
app.use('/order', orderRouter)


app.use((req, res, next) => {
    return res.status(500).json({
        message: 'Tidak terhubung!'
    })
})
module.exports = app;