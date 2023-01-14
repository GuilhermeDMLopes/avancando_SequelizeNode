const express = require('express');
const routes = require('./routes')

const app = express()
const port = 3500;

routes(app);

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

module.exports = app;

/*
Estamos utilizando um eslinter que tem a função de checar se identeção está correta, etc.

Utilizaremos a versão 6 do sequelize. Precisaremos atualizar o arquivo index.js em models
por conta da atualização.
*/