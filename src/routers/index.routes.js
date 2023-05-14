const router = require("express").Router(),
    {ControlIndex} = require("../controllers/index.controllers")

router.get("/", ControlIndex.RenderHome)

router.get("/about", ControlIndex.RenderAbout)

module.exports= router