const express = require('express'); // faz importação do express
const app = express(); // "joga" o express nesse const app
const userRoutes = express.Router(); // cria um esquema de rotas do express

//importa o modelo de usuario
let Aluno = require('C:/Users/mathe/OneDrive/Área de Trabalho/Atividades-Facul/3º -Período/Coding/Borapraaula_api/model/Aluno'); 

// Api para inserir usuários - metodo post
userRoutes.route('/add').post(function (req, res) {
    let aluno = new Aluno(req.body); // Faz instância de um novo objeto (aluno), 
    //que recebe como padrão req.body (Corpo da requisição front-end);    
    aluno.save() // Salva no banco de dados
    // verificação de sucesso e/ou falha que é devolvida ao front-end :
    .then(aluno => {
      res.status(200).json({'status': 'success','mssg': 'Usuário adcionado com sucesso!'});
    })
    .catch(err => {
      res.status(409).send({'status': 'failure','mssg': 'Não foi possível salvar à base de dados!'});
    });
  });
  
 // Api para retonar diversos usuários - metodo get
userRoutes.route('/').get(function (req, res) {
    Aluno.find(function (err, alunos){
      if(err){ //exemplificação com if/else (mesma funcionalidade da inserção)
        res.status(400).send({'status': 'failure','mssg': 'Algo saiu errado...'});
      }
      else {
        res.status(200).json({'status': 'success','alunos': alunos}); // se sucesso, retorna lista de usuários
      }
    });
  });
  
  // Api para retornar 1 usuário em específico - metodo get
  userRoutes.route('/aluno/:id').get(function (req, res) {
    let id = req.params.id; // coleta os parâmetros de ID
    Aluno.findById(id, function (err, aluno){ // Faz a busca do usuário pelo ID
      if(err){
        res.status(400).send({'status': 'failure','mssg': 'Algo saiu errado'});
      }
      else {
        res.status(200).json({'status': 'success','aluno': aluno});
      }
    });
  });
  
  // Api para atualizar o dado - metodo put
  userRoutes.route('/update/:id').put(function (req, res) {
      Aluno.findById(req.params.id, function(err, aluno) {
      if (!aluno){
        res.status(400).send({'status': 'failure','mssg': 'Não foi possível encontrar o dado especificado'});
      } else {
          aluno.name = req.body.name;
          aluno.email = req.body.email;
          aluno.phone_number = req.body.phone_number;
  
          aluno.save().then(business => {
            res.status(200).json({'status': 'success','mssg': 'Atualização completa'});
        })
      }
    });
  });
  
  // Api para deletar - metodo delete
  userRoutes.route('/delete/:id').delete(function (req, res) {
    Aluno.findByIdAndRemove({_id: req.params.id}, function(err,){
      if(err){
        res.status(400).send({'status': 'failure','mssg': 'Algo de errado aconteceu...'});
      }
      else {
        res.status(200).json({'status': 'success','mssg': 'Deletado com sucesso'});
      }
    });
  });

  module.exports = userRoutes;