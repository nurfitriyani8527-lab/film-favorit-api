const jwt = require('jsonwebtoken')
const User = require('../model/user')
const respon = require('../utils/response')

const authMiddleware = async (req,res,next) => {
    try {
        const token = req.headers.authorization
            if (!token) {
                return respon(res, 401, false, "Token tidak ditemukan");
            }
        const result = token.split(" ")[1]
            if(!result){
                return respon(res,401,false,"token salah")
            }
        const decoded = jwt.verify(result,process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select('-password')
            if(!user){
                return respon(res,401,false,"token user tidak cocok",error.message)
            }
        req.user = user
        next()
    } catch (error) {
        return respon(res,401,false,"gagal",error.message)
    }
}
module.exports = authMiddleware















