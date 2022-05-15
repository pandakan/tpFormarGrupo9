const adminCheck = (req, res, next) => {
    if (req.session.user.rol === "admin") {
        next();
    } else {
        res.send("No tienes permiso para entrar aqui")
    }
}

module.exports = adminCheck;