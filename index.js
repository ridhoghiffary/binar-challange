const dotenv = require('dotenv');
const app = require('./app');
dotenv.config();
const port = process.env.PORT || 80
app.listen(port, () => {
    console.log(`server is connected to port: ${port}`)
})