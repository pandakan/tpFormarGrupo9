const cookieSession = (req, res, next) => {
    if(typeof req.cookies !== "undefined"){
        if (req.cookies.pizzaCookie){
            req.session.user = req.cookies.pizzaCookie;
            res.locals.users = req.session.user;
        }
        next()
    }
}

module.exports = cookieSession;