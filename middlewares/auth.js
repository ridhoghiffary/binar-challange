require('dotenv').config()
const jwt = require('jsonwebtoken')
const auth = (req, res, next) => {

    try {
        const token = req.header('token');
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(verifiedToken){
            next();
        }
    } catch (error) {
        res.status(401).send({message: error});
    }
}
module.exports = {
    auth
}