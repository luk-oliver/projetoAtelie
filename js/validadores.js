export function valida(input){
    const tipoDeInput = input.dataset.tipo

    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
        
    }else{
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }
}

const tipoDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch'
]

const mensagemDeErro ={
    nome:{
        valueMissing: 'Este campo nome não poderá ficar em branco.',
    },

    email: {
        valueMissing:'Este campo email não poderá ficar em branco.',
        typeMismatch: 'O email digitado não é válido.'
    },
    cpf:{
        valueMissing:'o campo CPF não poderá ficar vazinho.',
        patternMismatch: 'o campo CPF não é válido'
    }
}

const validadores = {
    dataDeNascimento: input => input
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

function dataDeNascimento(input){
    const data = new Date()
    const idade = data.getUTCFullYear() + 18  + data.getMonth() + data.getDay();

}