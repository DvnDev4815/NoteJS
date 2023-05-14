const router= require("express").Router(),
    {UsersControl} = require("../controllers/users.controllers")

router.get("/users/register", UsersControl.renderFormRegister)
router.post("/users/register", UsersControl.Register)

router.get("/users/login", UsersControl.renderFormLogin)
router.post("/users/login", UsersControl.LogIn)

router.get("/users/logout", UsersControl.LogOut)

module.exports= router