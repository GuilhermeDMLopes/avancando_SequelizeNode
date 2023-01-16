'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define('Pessoas', {
    //Validação em nome, impedindo inserir menos de 3 caracteres
    //Podemos utilizar o validador len ou personalizar
    nome: {
      //Tipo de dados no campo
      type: DataTypes.STRING,
      //Validação do campo
      validate: {
        //Faremos uma função validadora
        //Geralmente os validators do sequelize ja cobrem quase tudo, mas podemos criar nossas proprias validações usando funções.
        funcaoValidadora: function(dado) {
          if(dado.length < 3) throw new Error('O campo nome deve ter mais de 3 caracteres')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    //Fazendo alterações para inserir validações
    //antes era apenas email: DataTypes.STRING
    email: {
      //Tipo de dados desse campo
      type: DataTypes.STRING,
      //Validação do campo
      validate: {
        //Verificar se é um email valido
        //Podemos colocar isEmail: true ou personalizar
        isEmail: {
          //Argumento
          args: true,
          //Mensagem que podemos retornar em caso de erro
          msg: 'dado do tipo e-mail inválidos'
        }
      }
    },
    role: DataTypes.STRING
  }, { 
    paranoid: true,
    //Passando o Scopo
    defaultScope: {
      //Colocamos aqui tudo o que queremos que aconteça no GET pedrão
      //Todos os meus select que retornem o atribute ativo true
      where: { ativo: true }
    },
    //Adicionando Scopo
    //Posso criar varios scopos
    scopes: {
      //nome do scopo 'todos'
      //Realiza a mesma função anterior a definirmos o defaultScope, retornando todos os dados sem nenhum filtro
      todos: { where: {} }
      //colocar os demais scopos
      //etc: { constraint: valor }

    }
   }); 
  Pessoas.associate = function(models) {
    Pessoas.hasMany(models.Turmas, {
      foreignKey: 'docente_id'
    }) 
    Pessoas.hasMany(models.Matriculas, {
      foreignKey: 'estudante_id'
    })
  };
  return Pessoas;
};