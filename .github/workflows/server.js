#Apenas o exemplo do código criado para deixar vincular com meu projeto de game
#URL do DB alterada




const express = require("express");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const app = express();
 
const port = "3000";
 
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
 
//DB
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
 
//Nova conexão com tratamento de erro
mongoose.connect("mongodb+srv://dbte3na:3@cluster0.avoqv.gcp.mongodb.net/test").then(() => {
    console.log('Conectado no BD...');
}).catch((e) => {
    console.log('Erro ao Conectar no BD...: ', e.message)
});

const schema = new Schema({
 
    name:{
        type: String,
        required: [true, "Nome é Obrigatório!"],
        trim: true,
        unique: true
    },
    level:{
        type: Number,
        required: [true, "Level é Obrigatório!"]
    },
    score:{
        type: Number,
        required: [true, "Score é Obrigatório!"]
    }
 
});
 
const Player = mongoose.model('Player', schema);
 
 
app.get("/", function(req, res, next){
 
    res.status(200).send("<h1>Bem vindo</h1>");    
 
});
 
//Dados do Player
app.get("/player", function(req, res, next){
 
 
    Player.find({}).then(data => {   
 
        if (data && data.length != 0) {
            res.status(200).send(data); 
        }else{
            res.status(204).send(); 
        }         
 
    }).catch(e => {
        res.status(500).send(e);
    })
 
});
 
app.get("/player/:name", function(req, res, next){
 
    Player.find({ name: req.params.name}).then(data => { 
        
        if (data && data.length != 0) {
            res.status(200).send(data);  
        }else{
            res.status(204).send();  
        }                    
 
    }).catch(e => {
        res.status(500).send(e);
    })
 
});
 
 
app.post("/player", function(req, res, next){
 
    var playerTemp = new Player(req.body);
 
    playerTemp.save().then(data => {
        if (data && data.length != 0) {
 
            res.status(201).send({
                message: "done"
            });    
 
        }else{
            res.status(400).send({
                message: "check the value"
            });
        }
        
    }).catch(e => {
        res.status(500).send({
            message: "erro",
            erro: e + " "
        });
 
    });
 
});
 
app.put("/player/:name", function(req, res, next){
 
    var query = {name: req.params.name};
 
    Player.findOneAndUpdate(query, req.body, (erro, data) => {
        if (erro) {
            res.status(500).send(erro);
        }else{
            if (data && data.length != 0) {
                res.status(202).send({message: "done"});
            }else{
                res.status(204).send();
            }            
        }
    });
 
});
 
app.delete("/player/:name", function(req, res, next){
 
    
    //res.status(200).send(player);
    var query = {name: req.params.name}
    //var value = req.body;
 
    Player.findOneAndDelete(query).then(data => {
        if (data && data.length != 0) {
            res.status(202).send({message: "done"});
        }else{
            res.status(204).send();
        }
        
    }).catch(e => {
        res.status(500).send(e);
    });
 
 
});
 
 
app.listen(port, function(){
 
    console.log("Server listening on port " + port + "...");

});
