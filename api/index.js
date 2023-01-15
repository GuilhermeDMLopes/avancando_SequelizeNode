//A partir da branch main. Vamos montar um modelo para que os registros importantes do sistema
//Não sejam apagados definitivamennte do banco
const express = require('express');
const routes = require('./routes')

const app = express()
const port = 3500;

routes(app);

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

module.exports = app;

/*
Para realizar essa operação, precisaremos marcar os registros como se fosse uma flag
Esse recurso do SQL chama SoftDelete ou exclusão suave.

No sequelize a função paranoid realiza o soft delete.

Vamos inserir essa função em todos os modelos:
paranoid: true

Quando usamos usamos o paranoid: true, ele não usa mais o delete, ele faz por baixo dos panos

UPDATE "posts" SET "deletedAt"=[timestamp] WHERE "deletedAt" IS NULL AND "id" = 1

NO entando, não temos a coluna o deletedAt, precisaremos criar. Ela ira registrar quando "deletamos" alguma informação

Para adicionar colunas usando o sequelize, fazemos:
direto no mysql: ALTER TABLE Pessoas ADD COLUMN deletedAt datetime AFTER UpdatedAt
ou utilizando migração. A vantagem de utilizar a migração é que no DB, quando utilizamos o sequelize,
ele cria uma tabela chamada SequelizeMeta. Essa tabela guarda todas as alterações que fizemos no banco.
Caso alguma delas venha a quebrar a aplicação, poderemos retornar ao estado anterior.

Utilizando migração para criar as colunas.
Iremos criar um arquivo novo de migração para cada modelo
'datahora'-addcolumn-'nome modelo'.js
Feito isso, executar o comando:

npx sequelize-cli db:migrate

Feito isso, a coluna deletedAt será criada.
Fazemos a deleção de um dado para ver o que acontece.
O dado não aparece mais no postman pois ele só retorna os dados em que deletedAt é diferente de NULL
NO entando, ao pesquisar direto no banco, o dado aparece com o data que foi deletado.
Com isso, fizemos um SOFT DELETE.


Mas é possível recuperar registros?

Para isso, usamos o controlador de cada modelo.
Como fizemos a deleção de uma pessoa no banco, iremos usar a classe PessoaController para recuperar o registro da pessoa deletada
Inserimos uma rota para ela
Testar no postman.
Agora faremos para cada controlador e rota. Detalhe, o modelo matricula faremos na classe de pessoa.

https://cursos.alura.com.br/course/orm-nodejs-avancando-sequelize/task/79552

*/