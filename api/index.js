//A partir da branch softDelete. Vamos montar um modelo para que os registros importantes do sistema
const express = require('express');
const routes = require('./routes')

const app = express()
const port = 3500;

routes(app);

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

module.exports = app;

/*
Utilizaremos o conceito de Scopes do sequelize para realizar o item 2 do arquivo requisitos.md

O escopo é como chamamos as regras que definem quão acessível ou “visível” uma informação (por 
exemplo, uma variável) está, dependendo da parte da aplicação. Um escopo pode ter identificadores, 
alguma instrução de código ou algoritmo.
No caso do Sequelize, podemos determinar o escopo padrão (defaultScope) que justamente define quais 
restrições e definições serão utilizadas na query… por padrão. E além do escopo padrão podemos definir 
outros, enquanto fizer sentido para a aplicação, e dar a cada escopo um nome que será usado pelo JavaScript 
para identificá-lo. Com isso é possível reutilizar código, definindo escopos para queries mais utilizadas e 
refinando estas queries através de palavras-chave como where, include, etc.

O Scopo é declarado nos modelos

É possível ter diversos escopos

Fazemos as modificações no controlador e nas rotas para utilizarmos os demais escopos


Agora faremos a validação para o item 3 do arquivo requisitos.js
Faremos essas validações direto no modelo.
Podemos fazer no banco com o comando: 
Qualquer valor diferente desses, não será válido

CHECK (status in ('confirmado', 'cancelado'))

Através do sequelize fazemos com Validations and Constraints
Na documentação de validations do sequelize, temos varias validações prontas como email, se cartao de credito é valido, etc.




*/