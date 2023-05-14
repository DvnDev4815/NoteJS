// require("dotenv").config();

const {app} = require("./server.js"),
    data = require("./database.js")

app.listen(app.get("port"), () => {
    console.log("Corriendo desde el puerto:", app.get("port"));
})