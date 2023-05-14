const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    UsersModel = require("../models/user");


passport.use("login", new LocalStrategy(async (username, password, done) => {

    // Match username
    const user = await UsersModel.findOne({ email: username })

    if (!user) {
        return done(null, false, { message: "User not found" })
    }
    else {
        const match = await user.matchPassword(password)

        if (match) {
            return done(null, user)
        }
        else {
            return done(null, false, { message: "Incorrect password" })
        }
    }

}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    await UsersModel.findById(id)
        .then(user => {
            done(null, user)
        })
        .catch(err => {
            done(err, false)
        })
})