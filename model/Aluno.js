const mongoose = require('mongoose'); // Faz import da ORM em questão
const Schema = mongoose.Schema; // Cria um novo esquema dentro da ORM

let Aluno = new Schema({  // Criação da classe usuário e insere os atributos :
  nome: {
    type: String
  },
  turma: {
    type: String
  },
  email: {
    type: String
  },
  telefone: {
    type: Number
  }
},{
    collection: 'aluno' // Transforma a função acima em uma tabela dentro do BD"
});
module.exports = mongoose.model('Aluno', Aluno); // Exporta o modelo