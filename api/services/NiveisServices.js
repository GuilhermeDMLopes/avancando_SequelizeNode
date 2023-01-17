//Realiza os serviços específicos do Modelo Niveis
//Importa o arquivo geral de serviços
const Services = require('./Services.js')

//Criando classe de serviço especifica para Niveis herdando a classe de Serviços
class NiveisServices extends Services {
    //Criando construtor
    constructor() {
        //Passando o Modelo de Niveis como parametro pra classe Services
        //Consequentemente a classe Services tera 'Niveis' no construtor
        super('Niveis')
    }

    //Onde serao criados metodos especificos do controllador de Niveis

}

module.exports = NiveisServices