//Realiza os serviços específicos do Modelo Matriculas
//Importa o arquivo geral de serviços
const Services = require('./Services.js')

//Criando classe de serviço especifica para Matriculas herdando a classe de Serviços
class MatriculasServices extends Services {
    //Criando construtor
    constructor() {
        //Passando o Modelo de Matriculas como parametro pra classe Services
        //Consequentemente a classe Services tera 'Matriculas' no construtor
        super('Matriculas')
    }

    //Onde serao criados metodos especificos do controllador de Matriculas

}

module.exports = MatriculasServices