//A partir da branch escopoAssociacoes_operadores. Vamos montar arquivos para transações
const express = require('express');
const routes = require('./routes')

const app = express()
const port = 3500;

routes(app);

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

module.exports = app;

/*
Iremos realizar o ultimo item do arquivo requisitos.md

Iremos escrever em PessoasController e iremos utilizar as operações em dois modelos.

Porém, existe um outro jeito de realizar este item que é através das transções.
Elas servem para garantir a integridade dos dados em operações que acessem mais de uma tabela ou que faça atualizações em varias linhas
de uma tabela. Caso tenha alguma falha, nenhum dado é salvo e retorna ao ponto anterior (Rollback) a operação

No Sequelize temos o método transaction().
Será executado por baixo dos panos o seguinte comando:
UPDATE `Pessoas` SET `ativo`=?,`updatedAt`=? WHERE (`deletedAt` IS NULL AND (`ativo` = ? AND `id` = ?))
Executing (default): UPDATE `Matriculas` SET `status`=?,`updatedAt`=? WHERE (`deletedAt` IS NULL AND `estudante_id` = ?)
Executing (177d7691-56d2-4934-b796-a6307be71006): COMMIT;

Ou seja, depois que o comando foi bem sucedido, ele envia um COMMIT para o banco, salvando as alterações.
Em caso de falha, sera executado o seguinte comando por baixo dos panos:
Executing (default): UPDATE `Matriculas` SET `status`=?,`updatedAt`=? WHERE (`deletedAt` IS NULL AND `x` = ?)
Executing (0c09dc01-0eaf-40a7-bac9-a51c778471bb): ROLLBACK;
O ROLLBACK serve para retornar ao estado anterior

Durante o processo, recebemos a mensagem:
DeprecationWarning: A boolean value was passed to options.operatorsAliases. This is a no-op with v5 and should be removed.
no terminal.

Isso acontece por não talvez estarmos utilizando Operadores com colchetes, etc.
Para remover, iremos no arquivo config.json
Como esta sendo deprecaciado, será tirado de uso, podemos remover essa linha do arquivo config
"operatorsAliases": false
*/