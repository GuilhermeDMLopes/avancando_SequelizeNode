//Realiza os serviços específicos do Modelo Turma
//Importa o arquivo geral de serviços
const Services = require('./Services.js')

//Criando classe de serviço especifica para Turmas herdando a classe de Serviços
class TurmasServices extends Services {
    //Criando construtor
    constructor() {
        //Passando o Modelo de Turmas como parametro pra classe Services
        //Consequentemente a classe Services tera 'Turmas' no construtor
        super('Turmas')
    }

    //Onde serao criados metodos especificos do controllador de Turmas

}

module.exports = TurmasServices