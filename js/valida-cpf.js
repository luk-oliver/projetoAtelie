export default function validaCPF(input){
    const cpf = input.value.replace(/\D/g, '')
        
    if (chegarCpfRepetido(cpf) || chegarEstruturaDoCpf(cpf)){

    input.setCustomValidity('O CPF digitado não é válido!')
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
   
      return DigitoRepetido.includes(cpf)
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


}
