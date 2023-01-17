//Faz a interface com o modelo
//importando modelos
const database = require('../models')

//criando classe de services
//Métodos comuns entre os modelos
class Services {
    //Ela terá um construtor que vai receber o nome de um modelo para cuidar
    //dos metodos de conexão com o banco
    constructor(nomeDoModelo) {
        //Pega o modelo que sera trabalhado
        this.nomeDoModelo = nomeDoModelo
    }

    //Criando método de teste com o metodo pegaPessoasAtivas e testar como os serviços funcionarão
    //Não sera um metodo estatico pois vamos instanciar de services em cada um dos controladores
    async pegaTodosOsRegistros() {
        //retorna os resultados
        //Se parece com a linha 'const todasAsPessoas = await database.Pessoas.scope('todos').findAll()' em PessoasController
        return database[this.nomeDoModelo].findAll()
    }

    //Pega um registro especifico
    //Passamos o id do registro como parametro
    //o id seria o where
    async pegaUmRegistro(id) {

    }

    //Cria registro
    //Passamos os dados que usariamos para criar como parametro
    async criaRegistro(dados) {

    }

    //Atualiza registro
    //Passando dados atualizados e o id 
    //o id seria o where
    //Metodo para realizar o serviço de cancelaPessoa
    async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
        //retorna update os dados atualizados vindo por parametro e onde ele deve ser feito (id)
        //Com ou sem transação. Se não tiver transação sera um objeto vazio, se houver, sera passado como parametro
        return database[this.nomeDoModelo].update(dadosAtualizados, { where: {id: id}}, transacao)
    }

    //Metodo especifico para fazer as alterações onde o where se aplica
    //Ao inves de receber um id unico, ele vai receber um where
    async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
        //Irá realizar o update com os dados recebidos, um spread de where onde vai montar as condições do where passados 
        //por parametro onde ele ira procurar os registros na tabela e fazer as atualizações
        return database[this.nomeDoModelo].update(dadosAtualizados, { where: {...where}}, transacao)
    }

    //Apaga Registro
    //Passa o id do registro para ser apagado
    //o id seria o where
    async apagaRegistro(id) {

    }

}

module.exports = Services