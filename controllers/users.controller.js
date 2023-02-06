const {
    Users
} = require('../db/models/index')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
class UsersController {
    async register(req, res, next) {
        try {
            const emailExist = await Users.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (emailExist) {
                return res.status(409).json({
                    code: 409,
                    message: "Email telah digunakan!"
                });
            } else {
                const salt = await bcrypt.genSaltSync(10);
                const passwordHashed = bcrypt.hashSync(req.body.password, salt);
                const user = await Users.create({
                    full_name: req.body.full_name,
                    username: req.body.username,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: passwordHashed
                })
                return res.status(200).json({
                    code: 200,
                    message: 'Akun berhasil didaftarkan',
                    data: {
                        fullName: user.fullName,
                        username: user.username,
                        phone: user.phone,
                        email: user.email
                    }
                })
            }
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const userLogin = await Users.findOne({
                where: {
                    email: req.body.email
                }
            });
            if (userLogin) {
                const comparePassword = bcrypt.compareSync(req.body.password, userLogin.password);
                if (comparePassword) {
                    const secret = process.env.JWT_SECRET_KEY;
                    const access_token = jwt.sign({
                        id: userLogin.id,
                    }, secret, {
                        expiresIn: '1h'
                    });
                    if (access_token) {
                        return res.status(200).json({
                            message: "Login Berhasil",
                            access_token
                        })
                    }
                } else {
                    return res.status(401)
                        .json({
                            code: 401,
                            message: "Password salah!"
                        })
                }
            } else {
                return res.status(403)
                    .json({
                        code: 403,
                        message: "Akun tidak terdaftar!"
                    })
            }
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    UsersController
}