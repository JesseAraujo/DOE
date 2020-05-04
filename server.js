//configrado servidor
const express = require("express")
const server = express()

//configurar servidor para apresentar arquivos estáticos
server.use(express.static('public'))

//habilitar body do formulário
server.use(express.urlencoded({ extended: true }))


//configurar conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'jba280694k',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})

//configurando a templeate engine
const nunjucks = require ("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})

//////////////////////////////////////////////////////////////////////////////////
//GET    /

//configurar a apresentaçã da página
server.get("/", function(req, res, next){
    
    db.query("SELECT * FROM donors", function (err, result) {
        if (err) return res.send("Erro no banco de dados.")

        let donors = result.rows
        return res.render("index.html", { donors })

        next()
    })
    }, function(req, re){
        const  button  = req.body.id
    
        const query = "SELECT * FROM donors WHERE id == "+[button]
          
        db.query(query, function(err) {
            if (err){
                return res.send("Erro no banco de dados.")            
            }
                    
             donors = result.rows
            return res.render("index.html", { donors }) 
            
        })    
    }
)

//server.get("/", function(req, re){
   // const  id  = req.params.id

   // const query = "SELECT * FROM donors WHERE id = "+[id]
      
   // db.query(query, function(err) {
   //     if (err){
    //        console.log(err)
    //        return res.send("Erro no banco de dados.")            
    //    }
    //            
    //    const donors = result.rows
    //    return res.send(donors)   
        
    //})    
//})



//POST    /
server.post("/", function(req, res) {
    //pegar dados do formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if ((name == '') || (email == '') || (blood == '')){
       return res.send("Todos os campos são Obrigatórios.")
    }

    const query = `
        INSERT INTO donors ("name", "email", "blood")
        VALUES ($1, $2, $3)`

    const values = [name, email, blood]

    // coloque valores dentro do banco de dados
    db.query(query, values, function(err) {
        if (err) return res.send("Erro no banco de dados.")

        return res.redirect("/")
    })    
})



//////////////////////////////////////////////////////////////////////////////////
//ligar servidor e permitir o acesso na porta 8000
server.listen(8000, function(){
    console.log("Iniciei o Servidor")
})
