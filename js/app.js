import  validaDataDeNascimento  from "./valida-idade.js";
import  validaCPF  from "./valida-cpf.js";
import validaCEP from "./valida-CEP.js"

const inputs = document.querySelectorAll("input")

inputs.forEach(input => {
    input.addEventListener('blur', () => verificadorInput(input));
    input.addEventListener('invalid', (evento) => evento.preventDefault())

})

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
        valueMissing: 'O campo senha não poderá ficar em branco',
        customError: 'A senha só poderá conter letra maiúsculo e minúsculo com mínimo de 60 e máximo de  8 caracteres.'
    },
   
    aniversario: {
        valueMissing: 'O campo data de nascimento não poderá ficar em branco.',
        customError: 'So poderá ser cadastra maiores de 18 anos'
    },

    cpf: {
        valueMissing:' O campo CPF não poderá ficar em branco.',
        patternMismatch: 'O CPF digitado é invalido',
        
    },

    cep:{
        valueMissing: 'o campo CEP não poderá ficar em branco.',
        patternMismatch: 'O número do cep não é válido.',
        customError: 'Não foi possível encontrar o CEP.'

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


function verificadorInput(input){
    
    let mensagem = "";

    if(input.name == 'cpf' && input.name.length >= 11){
        validaCPF(input)
    }

    if(input.name == 'aniversario' && input.value != ''){
        validaDataDeNascimento(input)
    }

    if(input.name == 'cep' && input.value != ''){
        validaCEP(input)
    }

    
    tipoDeErro.forEach(erro => {
        if(input.validity[erro]){
            mensagem = mensagemDeErro[input.name][erro];

        }
        return mensagem
    })
    const validadorDeInput = input.checkValidity(); 


    if (validadorDeInput){
        input.parentElement.classList.remove('input-container--invalido')
        input.parentNode.querySelector('.input-mensagem-erro').innerHTML = ''
       
    }else{
        input.parentElement.classList.add('input-container--invalido')
        input.parentNode.querySelector('.input-mensagem-erro').innerHTML = mensagem
    }
        
    // const mensagemDeErro = input.parentNode.querySelector('.input-mensagem-erro')
  

    //  if (!validadorDeInput){
    //     mensagemDeErro.textContent = mensagem;
    // }else{
    //    mensagemDeErro.textContent = ""
    // }

}



