const database = require('../models')
//IMportar metodo do sequelize para escrever query SQL
const Sequelize = require ('sequelize')

class PessoaController {
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await database.Pessoas.scope('todos').findAll()
            return res.status(200).json(todasAsPessoas)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await database.Pessoas.findAll()
            return res.status(200).json(pessoasAtivas)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params
        try {      
            const umaPessoa = await database.Pessoas.findOne({where: {id: Number(id)}})
            return res.status(200).json(umaPessoa)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(req, res){
        const novasInfos = req.body
        const { id } = req.params
        try { 
            await database.Pessoas.update(novasInfos, { where: {id: Number(id)}})
            const pessoaAtualizada = await database.Pessoas.findOne( {where: {id: Number(id)}})
            return res.status(200).json(pessoaAtualizada)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletaPessoa(req, res){
        const { id } = req.params
        try {
            await database.Pessoas.destroy( { where: {id: Number(id)}})
            return res.status(200).json({message: `A Pessoa de id ${id} foi removida com sucesso!`})
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {     
            const umaMatricula= await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId), 
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json(umaMatricula)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId)}
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res){
        const novasInfos = req.body
        const { estudanteId, matriculaId } = req.params
        try { 
            await database.Matriculas.update(novasInfos, { 
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            const matriculaAtualizada = await database.Matriculas.findOne( {where: {id: Number(matriculaId)}})
            return res.status(200).json(matriculaAtualizada)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletaMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.destroy( { where: {
                id: Number(matriculaId)
            }
        })
            return res.status(200).json({message: `A Matricula de id ${matriculaId} foi removida com sucesso!`})
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.restore( {where: { id: Number(id)}})
            return res.status(200).json( { mensagem: `A pessoa de id ${id} foi restaurada`})
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
          await database.Matriculas.restore({
            where: {
              id: Number(matriculaId),
              estudante_id: Number(estudanteId)
            }
          })
          return res.status(200).json({ mensagem: `id ${id} restaurado`})
        } catch (error) {
          return res.status(500).json(error.message)
        }
    }

    //consultar todas as matrículas confirmadas referentes a estudante X de forma rápida.
    static async pegaMatriculas(req, res){
        //Pegaremos o id do estudante e a matricula como parametro
        const { estudanteId } = req.params
        try {
            //Busca um estudante de uma matricula em específico
            const pessoa = await database.Pessoas.findOne({ where: {id: Number(estudanteId)}})
            //Pegar as matriculas confirmadas do estudante usando mixin
            //Aulas matriculadas é o nome que demos ao escopo de associação que criou automaticamente esse mixin/essa função getAulasMatriculadas()
            const matriculas = await pessoa.getAulasMatriculadas()

            return res.status(200).json(matriculas)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    //Pega Matriculas por turma
    static async pegaMatriculasPorTurma(req, res){
        //Recebe o id da turma para checar quantas matriculas eu tenho por id de turma
        const { turmaId } = req.params
        try {
            //Encontra e conta todas as matriculas de uma turma que tem o status confirmado
            const todasAsMatriculas = await database.Matriculas.findAndCountAll( { 
                where: {
                    //Verifica se o id da turma existe
                    turma_id: Number(turmaId),
                    //Verifica se o status da matricula é 'confirmado'
                    status: 'confirmado'
                },
                //Podemos adicionar algumas coisas adicionais em findAndCountAll
                //Limitamos a quantidade de dados exibidos por vez, no caso, 1 por vez
                limit: 1,
                //Ordenar os resultados atraves da coluna estudante_id e se sera ASC (ascendente) ou DESC (descendente)
                order: [['estudante_id', 'ASC']]
            })
            //Se eu fizer todasAsMatriculas.count, irá retornar apenas a quantidade de matriculas confirmadas.
            return res.status(200).json(todasAsMatriculas)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }

    //Verifica se a turma está lotada
    static async pegaTurmasLotadas(req, res){
        //Quantidade de registros que faz com que uma turma esteja lotada
        const lotacaoTurma = 2;
        try { 
            //Contar or registros da turma e ver se está lotadas
            const turmasLotadas = await database.Matriculas.findAndCountAll( {
                where: {
                    //retorna apenas as matriculas de status confirmado
                    status: 'confirmado'
                },
                //passando turma id como atributos para um grupo
                //Irá mostrar apenas a turma id e a contagem de cada turma
                attributes: ['turma_id'],
                //Irá agrupar por turma_id
                group: ['turma_id'],
                //Agora precisaremos escrever codigo SQL para contar a quantidade de matriculados na turma e checar se ela está lotada
                //Se for maior que 2, ela estará lotada e será retornada 
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`) 
            })
            return res.status(200).json(turmasLotadas)
        } catch(error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController;