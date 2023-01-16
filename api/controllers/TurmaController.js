const database = require('../models')
//importanto operadores do sequelize
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class TurmaController {
  /*static async pegaTodasAsTurmas(req, res){
    try {
      const todasAsTurmas = await database.Turmas.findAll()
      return res.status(200).json(todasAsTurmas)  
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }*/

  //Construindo função de busca com o filtro de datas ou pega todos caso não tenha sido passado nada
  static async pegaTodasAsTurmas(req, res){
    //Pegando os parametros da requisição
    const { data_inicial, data_final } = req.query
    //variavel de condição para o parametro
    const where = {}
    //Verifica se existem os parametros data_inicial ou data_final na query para passar para dentro do where
    //Se existir ele vai inserir dentro do objeto where e criar a porpriedade data_inicio(nome da coluna), se não tiver nada, passar null.
    data_inicial || data_final ? where.data_inicio = {} : null  
    //Se a data inicial existir, vamos passar ele pra dentro do objeto where criado
    //Operador gte é maior o igual. Se não houver nada, será null
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
    //Mesma coisa deve ser feita para data final
    //Se recebermos um parametro com data final, passaremos para dentro da propriedade inicio o Operador menor = ao valor da data final
    data_final ? where.data_inicio[Op.lte] = data_final : null
    try {
      //Passando a variavel where como parametro
      const todasAsTurmas = await database.Turmas.findAll({where})
      return res.status(200).json(todasAsTurmas)  
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async pegaUmaTurma(req, res) {
    const { id } = req.params
    try {
      const umaTurma = await database.Turmas.findOne( { 
        where: { 
          id: Number(id) 
        }
      })
      return res.status(200).json(umaTurma)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criaTurma(req, res) {
    const novaTurma = req.body
    try {
      const novaTurmaCriada = await database.Turmas.create(novaTurma)
      return res.status(200).json(novaTurmaCriada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizaTurma(req, res) {
    const { id } = req.params
    const novasInfos = req.body
    try {
      await database.Turmas.update(novasInfos, { where: { id: Number(id) }})
      const turmaAtualizada = await database.Turmas.findOne( { where: { id: Number(id) }})
      return res.status(200).json(turmaAtualizada)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async apagaTurma(req, res) {
    const { id } = req.params
    try {
      await database.Turmas.destroy({ where: { id: Number(id) }})
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async restauraTurma(req, res) {
    const { id } = req.params
    try {
      await database.Turmas.restore( {where: { id: Number(id) } } )
      return res.status(200).json({ mensagem: `id ${id} restaurado`})
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

}

module.exports = TurmaController