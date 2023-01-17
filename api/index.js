//A partir da branch transacoes. Vamos refatorar nosso codigo usando serviços
const express = require('express');
const routes = require('./routes')

const app = express()
const port = 3500;

routes(app);

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

module.exports = app;

/*
O que são serviços?

Enquanto uma aplicação é pequena, como a que temos o nosso projeto. A estrutura segue o modelo MVC classico
Temos os modelos que fazem a regra de negocio, views para enviar ao front/postman, controladores que fazem interface entre modelo e banco de dados.
A medida que o projeto vai crescendo, o controlador começa a ter muitas funções, fica dificil refatorar e fica dificil que cada parte do codigo
faça apenas uma coisa.

Para isso, tentamos reaproveitar um pouco de codigo e separar algumas dessas responsabilidades adicionando uma camada de Serviços
Os controladores tem métodos em comum (findAll, findOne, etc..), vamos passar a responsabilidade de conectar ao DB e processar os dados que vai receber
e enviar e passar para os serviços. Essa camada de serviços vai ficar entre o controlador e o modelo.

Com o uso dos serviços, os controladores não saberão qual banco está sendo usado. Quem fara essa conexão é o arquivo de serviços
Qualquer alteração nesse sentido fica concentrado em serviços.
Refatorando PessoaController

Dessa forma os controladores podem continuar cuidando da validação, recebendo as requisições, receber os dados
envia para um serviço e só retorna as repostas do serviços.
Enquanto isso os serviços se conectam com o DB, processam os dados e mandam de volta pra quem pediu.
*/