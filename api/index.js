//A partir da branch escopoModelo_validacoes. Vamos montar escopos para associações e operadores
const express = require('express');
const routes = require('./routes')

const app = express()
const port = 3500;

routes(app);

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

module.exports = app;

/*
Faremos os itens 4,5 e 6 do arquivo requisitos.md
Iremos realizar o item 4 do arquivos requisitos.md
consultar todas as matrículas confirmadas referentes a estudante X de forma rápida

Iremos implementar na classe PessoaController. Podemos fazer de duas formas:
Criando uma função para ela
Fazendo escopo de associação

Escopo de associação é similar ao scopo de modelo, porém em associações. Através disso,
conseguimos cruzar informações.

O sequelize utiliza alguns métodos chamados de mixins para realizar essas operações
No controlador de pessoas, faremos alterações

Query executada no BD:

SELECT `id`, `status`, `createdAt`, `updatedAt`, `deletedAt`, `estudante_id`, `turma_id` FROM `Matriculas` AS `Matriculas` WHERE (`Matriculas`.`deletedAt` IS NULL AND (`Matriculas`.`status` = 'confirmado' AND `Matriculas`.`estudante_id` = 1));

Podemos resumir mixins em: classes que contêm métodos que podem ser utilizados por outras 
classes, sem a necessidade de herança direta. Dito de outra forma, um mixin fornece métodos 
que implementam um certo comportamento em objetos, sem poder ser utilizado sozinho, mas sim para 
adicionar esse comportamento a outras classes. No Sequelize, temos uma diferença entre escopos de 
modelo, que são aplicados em chamadas estáticas ao modelo (como no exemplo que fizemos no vídeo, 
Pessoas.scope('todos').findAll()), e escopos de associação, que são uma regra, ou um conjunto de atributos 
que são automaticamente aplicados em instâncias do modelo, como em Pessoas.associate = function(models) {...}.

Escopos de associação se comportam da mesma forma que os escopos de modelo, no sentido que ambos aplicam palavras-chave 
como WHERE em chamadas ao banco; mas os mixins são métodos que existem somente nas instâncias dos modelos: 
Pessoas.getPessoasMatriculadas, Niveis.getNiveisPorTurma, etc.
Lista de métodos criados automaticamente em:
https://cursos.alura.com.br/course/orm-nodejs-avancando-sequelize/task/79567


Passaremos para o próximo requisito, item 5 no arquivo requisitos.md
consultar as turmas abertas por intervalo de data, para não receber informações desnecessárias (como turmas antigas).

Podemos fazer isso através de querys strings. Porém é uma forma mais supérfula. Exemplo
https:localgost:3500/turmas?data_inicial=2023-01-01&data_final=2023-02-01
diretamente no endpoint.

Para a API pegar isso e usar em um where para filtrar e limitar o resultado de um get.

Podemos usar operadores: palavras reservadas do SQL (<,>,<=,>=,=,etc)

O sequelize tem operadores basicos do SQL. 
Precisaremos importar
faremos a importação em TurmaController

Para o item 6 do arquivo requisitos.md
Precisamos contar a quantidade de matriculas referentes ao mesmo id de turma e comparar com o numero maximo que
se pode ter de turmas com matriculas confirmadas e exibir so os registros que passem nessa comparação

Iremos fazer em PessoasController
O sequelize tem um metodo findAndCountAll para contar a quantidade de matriculas de uma turma
em seguida adicionaremos a rota da requisição

Para pegar as turmas lotadas, precisaremos usar a função literal() do sequelize para realizar um query em SQL que não
era possível fazer apenas com sequelize. Que era verificar se a quantidade de pessoas em uma turma estava maior que o limite

A query que aparece no nodemon é:
SELECT `turma_id` FROM `Matriculas` AS `Matriculas` WHERE (`Matriculas`.`deletedAt` IS NULL AND `Matriculas`.`status` = 'confirmado') GROUP BY `turma_id` HAVING count(turma_id) >= 2;

https://cursos.alura.com.br/course/orm-nodejs-avancando-sequelize/task/79548

OBS: o SQL segue uma ordem de comandos, que são:
SELECT, FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT
*/