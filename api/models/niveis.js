'use strict';
module.exports = (sequelize, DataTypes) => {
  const Niveis = sequelize.define('Niveis', {
    descr_nivel: DataTypes.STRING
  }, { paranoid: true }); // paranoid: true é a função para o soft delete
  Niveis.associate = function(models) {
    Niveis.hasMany(models.Turmas,
      {
        foreignKey: 'nivel_id'
      })    
  };
  return Niveis;
};