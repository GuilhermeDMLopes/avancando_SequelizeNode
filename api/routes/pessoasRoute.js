const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

//router.get('/pessoas/todos', PessoaController.pegaTodasAsPessoas)
//router.get('/pessoas', PessoaController.pegaPessoasAtivas)
//Depois de adicionar os metodos especificos de pessoas em PessoasServices, fica:
router.get('/pessoas', PessoaController.pegaTodasAsPessoas)
router.get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)
router.post('/pessoas', PessoaController.criaPessoa)
router.put('/pessoas/:id', PessoaController.atualizaPessoa)
router.delete('/pessoas/:id', PessoaController.deletaPessoa)
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula)
router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deletaMatricula)
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
router.post('/pessoas/:estudanteId/matricula/:matriculaId/restaura', PessoaController.restauraMatricula)
router.get('/pessoas/matricula/lotada', PessoaController.pegaTurmasLotadas)
router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma)
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)


module.exports = router