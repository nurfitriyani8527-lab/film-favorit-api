const User = require('../model/user')
const jwt = require('jsonwebtoken')
const respon = require('../utils/response')

exports.Register = async (req,res) => {
        const { name,email,password } = req.body
        if(!name || !email || !password){
            return respon(res,400,false,"tidak bisa menambahkan data",{
                fields: {
                    name: !name ? "nama wajib diisi" : null,
                    email: !email ? "email wajib diisi" : null,
                    password: !password ? "password wajib diisi" : null
                }
            })
        }
            const duplikat = await User.findOne({email})
            if(duplikat){
                return respon(res,400,false,"Email sudah terdaftar")
            }
            try {
                const dataBaruAkun = new User({
                    name,
                    email,
                    password
                })
                await dataBaruAkun.save()
                return respon(res,201,true,"data berhasil ditambahkan",dataBaruAkun)
            } catch(error){
                return respon(res,500,false,"terjadi kesalahan saat menambahkan data",error.message)
            }
}

exports.login = async (req,res) => {
    try{
    const { name,email,password } = req.body
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return respon(res,401,false,"user tidak ditemukan")
    }
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return respon(res,401,false,"email atau password salah")
    }
    const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    respon(res,200,true,"login berhasil",{
        token: token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
            }
        })
    } catch(error){
        respon(res,500,false,"tidak bisa login",error.message)
    }
}

exports.logout = (async(req,res) => {
    try {
        const _id = req.params.id
        console.log("user logout",req.user)
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return respon(res,404,false,`akun dengan id ${_id} tidak ditemukan`,user)
        }
        const token = req.headers['authorization']?.split(' ')[1];
        tokenBlacklist.add(token);
        respon(res,200,true,`akun dengan id ${_id} berhasil di hapus`,user)
    } catch (error) {
        return respon(res,500,false,"terjadi kesalahan saat logout",error.message)
    }
})