const Control= {}

Control.RenderHome = (req, res)=>{
    res.render("index");
}

Control.RenderAbout = (req, res)=>{
    res.render("about");
}

module.exports= {
    ControlIndex: Control
}