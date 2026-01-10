const respon = ((res,status,success,message,data) => {
    res.status(status).json({
        payload: {
            success: success,
            message: message,
            data: data
        }
    })
})
module.exports = respon