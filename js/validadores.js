export function valida(input){
    const tipoDeInput = input.dataset.tipo

    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
        
    }else{
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }
}

const tipoDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagemDeErro = {

    nome:{
        valueMissing: 'Este campo nome não poderá ficar em branco.',
    },

    email: {
        valueMissing:'Este campo email não poderá ficar em branco.',
        typeMismatch: 'O email digitado não é válido.'
    },

    senha:{
        valueMissing: 'O campo senha não poderá ficar vazinho',
        customError: 'A senha só poderá conter letra maiúsculo e minúsculo com mínimo de 60 e máximo de  8 caracteres.'
    },
   
    dataNascimento: {
        valueMissing: 'O campo data de nascimento não poderá ficar vazinho.',
        customError: 'So poderá ser cadastra maiores de 18 anos'
    },

    cpf: {
        valueMissing:' O campo CPF não poderá ficar vazinho.',
        patternMismatch: 'O CPF digitado não é invalido'
    },

    cep:{
        valueMissing: 'o campo CEP não poderá ficar vazinho.',
        customError: 'O CEP digitado é invalido.'

    },

    logradouro:{
        valueMissing: 'O campo logradouro não poderá ficar vazinho.',

    },

    cidade: {
        valueMissing: 'O campo cidade não poderá ficar vazinho.',
    },

    estado: {
        valueMissing: 'O campo estado não poderá ficar vazinho.',
    },

}

const validadores = {
    dataNascimento: input => validaDataDeNascimento(input),
    cpf: input => validaCPF(input)
}


function mostraMensagemDeErro(tipoDeInput, input){
    let mensagem = ''
    
    tipoDeErro.forEach(erro => {
        if(input.validity[erro]){
            mensagem = mensagemDeErro[tipoDeInput][erro];

        }
        
    })

    return mensagem
}

function validaDataDeNascimento(input){
    let dataRecebida = new Date (input.value);

    let mensagem = '';

    if(!idadeDe18(dataRecebida)){
        mensagem = 'So poderá ser cadastra maiores de 18 anos'
    
    }
    input.setCustomValidity(mensagem)
}

function idadeDe18(data){
    let idadeAtual = new Date();
    let idadeDe18 = new Date(data.getUTCFullYear() + 18,  data.getUTCMonth(), data.getUTCDay());

    return idadeDe18 <= idadeAtual

}


function validaCPF(input){
    const cpfFormatado = input.value.replace(/\D/g, '')
        
    let mensagem = ''

    if (!chegarCpfRepetido(cpfFormatado) || !chegarEstruturaDoCpf(cpfFormatado)){

         mensagem = 'O CPF digitado é invalido'
    }
       
    input.setCustomValidity(mensagem)
}

function chegarCpfRepetido(cpf){

    const DigitoRepetido = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ]

    let validaCpf = true;

    DigitoRepetido.forEach(valor =>{
        if(valor == cpf){
           validaCpf = false

        }
       
    })

        return validaCpf
}

function chegarEstruturaDoCpf(cpf){

    const multiplicador = 10
    return chegaDigitoVerificador(cpf, multiplicador)

}

function chegaDigitoVerificador(cpf, multiplicador){
    if(multiplicador >= 12){
        return true
    }
    let multiplicadorInicial = multiplicador
    let soma = 0
    const CpfSemDigito = cpf.substr(0, multiplicador - 1).split('')
    const digitoVerificador = cpf.charAt(multiplicador - 1)
   
    for(let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--){
        soma = soma + CpfSemDigito[contador] * multiplicadorInicial
        contador++
    }

    if(digitoVerificador == confirmaDigito(soma)){

        return chegaDigitoVerificador(cpf, multiplicador +  1)
    }

    return false
}

function confirmaDigito(soma){
    soma = 11 - (soma % 11)
}



