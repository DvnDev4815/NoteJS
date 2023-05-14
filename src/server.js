const express = require("express"),
    methondOverride = require("method-override"),
    exphbs = require("express-handlebars"),
    session= require("express-session"),
    flash = require("express-flash"),
    passport= require("passport"),
    morgan = require("morgan"),
    path = require("path")

const app = express();
require("./config/passport");

// Settings
app.set("port", process.env.port || 8000);
app.set("views", path.join(__dirname, "views"));

app.engine(".hbs", exphbs.engine({
    defaultLayout: "main",

    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),

    extname: ".hbs"
}))

app.set("view engine", ".hbs");


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methondOverride("_method"));
app.use(morgan("dev"));

app.use(session({
    resave: true,
    secret: "secret",
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Global variables
app.use((res, req, next) => {
    req.locals.success_msg = res.flash("success_msg")
    req.locals.error_msg = res.flash("error_msg")
    req.locals.error= res.flash("error")
    req.locals.user= res.user || null
    next()
})

// Routers
app.use(require("./routers/index.routes"));
app.use(require("./routers/notes.routes"));
app.use(require("./routers/users.routes"));


// Static files
app.use(express.static(path.join(__dirname, "public")));

module.exports = {
    app: app
}