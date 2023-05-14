const UsersControl= {},
    UsersModel= require("../models/user"),
    passport = require("passport")

UsersControl.renderFormRegister= (req, res) =>{
    res.render("users/RegisterForm");
}

UsersControl.Register= async (req, res) => {
    const {UserName, EMail, Password, ConfirmPasword} = req.body,
        Arg_errors= [];

    if(UserName === "" || EMail === "" || Password === "" || ConfirmPasword === ""){
        Arg_errors.push({
            text: "Fill in all required fields"
        })
    }

    if(UserName < 4){
        Arg_errors.push({
            text: "Username must be longer than 4 characters."
        })
    }

    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(Password)) {
        Arg_errors.push({
            text: "Password must have at least one capital letter, a special sign (_-!=/&$#!) and 8 caracters"
        })
    }

    if(Password !== ConfirmPasword){
        Arg_errors.push({
            text: "The two passwords don't match"
        })
    }

    if(Arg_errors.length > 0){
        res.render("users/RegisterForm", {
            Arg_errors,
            UserName,
            EMail   
        });
    }
    else{
        const Validation = await UsersModel.findOne({
            email: EMail
        })

        if(Validation){
            req.flash("error_msg", "There is already a user with that email")
            res.redirect("/users/register")
        }
        else{
            const NewUser= new UsersModel({
                name: UserName,
                email: EMail,
                password: Password
            })

            NewUser.password= await NewUser.encryptPassword(Password)
            await NewUser.save()

            req.flash("success_msg", "You're registred")
            res.redirect("/users/login")
        }
    }
}

UsersControl.renderFormLogin= (req, res) => {
    res.render("users/LoginForm")
}

UsersControl.LogIn= passport.authenticate("login", {
    failureRedirect: "/users/login",
    successRedirect: "/notes/privates_notes",
    failureFlash: true
})

UsersControl.LogOut= (req, res) => {
    req.logout( (err) => {

        if (err) { return next(err); }
        req.flash( "success_msg" , "Session are closed" );
        res.redirect( "/users/login" );

    });
}

module.exports= {
    UsersControl: UsersControl
}