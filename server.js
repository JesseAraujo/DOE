//configrado servidor
const express = require("express")
const server = express()

//configurar servidor para apresentar arquivos extras
server.use(express.static("css"))
server.use(express.static("image"))
server.use(express.static("js"))

//configurando a templeate engine
const nunjucks = require ("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})


//lista de doadores
const donors =[
    {
        name: "Jessé Brisola",
        blood: "A+"
    },
    {
        name: "Bruna",
        blood: "A-"
    },
    {
        name: "Caleb",
        blood: "A+"
    },
    {
        name: "Ednaldo",
        blood: "O+"
    },
]

//configurar a apresentaçã da página
server.get("/", function(req, res){
    return res.render("index.html", {donors})
})

//ligar servidor e permitir o acesso na porta 8000
server.listen(8000, function(){
    console.log("Iniciei o Servidor")
})
