'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define('Pessoas', {
    nome: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, { 
    paranoid: true,
    //Passando o Scopo
    defaultScope: {
      //Colocamos aqui tudo o que queremos que aconteça no GET pedrão
      //Todos os meus select que retornem o atribute ativo true
      where: { ativo: true }
    },
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