const mongoose= require("mongoose"),
    {APP_MONGODB_HOST, APP_MONGODB_DATABASE} = process.env;

const URI= `mongodb://${APP_MONGODB_HOST}/${APP_MONGODB_DATABASE}`

mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(
        db => console.log("Conexion con la base de datos: Exitosa!")
    )
    .catch(
        err => console.log("Conexion con la base de datos: Sin resolver... :[")
    )