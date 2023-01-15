//Arquivo criado manualmente, colocamos a data e horario que ele foi criado + nome do arquivo.
//Copiamos e colamos o conteudo do arquivo create pessoas
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    //Alteramos para adicionar coluna
    //addColumn(nomeTabela, nomeColuna, objeto com as propriedades dessa coluna)
    return queryInterface.addColumn('Pessoas', 'deletedAt', {      
        allowNull: true,       
        type: Sequelize.DATE     
    });
  },
  down: (queryInterface, Sequelize) => {
    //Desfazer caso haja algum problema, removemos a tabela
    return queryInterface.removeColumn('Pessoas', 'deletedAt');
  }
};