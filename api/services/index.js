//Arquivo de ponto de entrada da parte de serviços. Assim como é feito em Routes
//importa serviços
const PessoasServices = require('./PessoasServices')
const TurmasServices = require('./TurmasServices')
const NiveisServices = require('./NiveisServices')
const MatriculasServices = require('./MatriculasService')

//Exportando serviços
module.exports = {
    PessoasServices: PessoasServices,
    TurmasServices: TurmasServices,
    NiveisServices: NiveisServices,
    MatriculasServices: MatriculasServices
}