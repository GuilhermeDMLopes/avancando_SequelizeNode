const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

//Adicionando 'todos' na rota apenas para diferenciar do de baixo, mas é opcional.
router.get('/pessoas/todos', PessoaController.pegaTodasAsPessoas)
//Adicionando rota para utilizar scopo padrão
router.get('/pessoas', PessoaController.pegaPessoasAtivas)
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


module.exports = router