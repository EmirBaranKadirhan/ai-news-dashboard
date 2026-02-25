const errorMiddleware = (err, req, res, next) => {      // error middleware'larda 4 parametre kullanilir !!

    console.error("Hata Detayı:", err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Sunucu taraflı bir hata oluştu";

    res.status(statusCode).json({
        success: false,
        message: message,
        // gelistirme asamasinda hatanin nerede oldugunu gorururz 
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })

}


module.exports = errorMiddleware