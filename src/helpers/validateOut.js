const helper= {}

helper.IsLogin = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    else{
        req.flash("error_msg", "you're not logged")
        res.redirect("/users/login")
    }
}

module.exports= helper