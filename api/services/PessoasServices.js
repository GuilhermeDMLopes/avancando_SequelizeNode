//Realiza os serviços específicos do Modelo Pessoa
//Importa o arquivo geral de serviços
const Services = require('./Services.js')
//importando databse
const database = require('../models')

//Criando classe de serviço especifica para pessoa herdando a classe de Serviços
class PessoasServices extends Services {
    //Criando construtor
    constructor() {
        //Passando o Modelo de pessoas como parametro pra classe Services
        //Consequentemente a classe Services tera 'Pessoas' no construtor
        super('Pessoas')
        //Para trabalhar com Matriculas quando necessario. Método cancelaPessoa()
        //INstanciamos um novo serviço de matriculas
        this.matriculas = new Services('Matriculas')
    }

    //Onde serao criados metodos especificos do controlador de pessoas

    //Serviço para pegar registros ativos utilizando scopo 'todos'
    //Passaremos um objeto por parametro
    async pegaRegistroAtivos( where = {}) {
        //findAll vai funcionar tanto se where não tiver nada quanto se tiver qualquer valor
        return database[this.nomeDoModelo].findAll({ where: {...where}})

    }

    //Criando serviço para pegar todos os registros
    //Passaremos um objeto 'where' como parametro
    async pegaTodosOsRegistros(where = {}){
        //Irá retornar todos os registros dentro do escopo 'todos'
        return database[this.nomeDoModelo].scope('todos').findAll({ where: {...where}})
    }
    
    //Criando serviço para realizar interface com serviço de matriculas
    //Recebe id da pessoa
    async cancelaPessoaEMatriculas(estudanteId) {
        //irá retornar a transação inteira
        return database.sequelize.transaction(async transacao => {
            //Substituir os updates pelos metodos criados dentro de services.js
            //Atualização na tabela de pessoas passando o que sera alterado, onde vai ser alterado, um objeto contendo a transação
            await super.atualizaRegistro({ ativo: false}, estudanteId, {
                transaction: transacao
            } )
            //Atualizando na tabela Matriculas 
            //Passmos o que sera alterado, onde sera alterado e a transacao
            await this.matriculas.atualizaRegistros({ status: 'cancelado'}, {estudante_id: estudanteId}, { transaction: transacao})
        })
    }
}

module.exports = PessoasServices