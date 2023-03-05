export default function validaCEP(input){
    const cep = input.value.replace(/\D/g, '')
    const url = `https://viacep.com.br/ws/${cep}/json/`

    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json; charset utf-8',
        }

    }
    if(!input.validity.patterMismatch && !input.validity.valueMissing) {
        
        fetch(url, options).then(
            response => response.json()
        ).then(
            data =>{
                console.log(data)

                if(data.erro){
                    input.setCustomValidity('O CEP digitado não é válido')
                    return
                }else{
                    input.setCustomValidity('')
                     preencherDadosDoCep(data)
                    return
                }
            }
        )
    }
}

function preencherDadosDoCep(data){
    // const input = data.dataset.tipo
    const rua = document.querySelector('[data-tipo="logradouro"]')
    const cidade = document.querySelector('[data-tipo="cidade"]')
    const estado = document.querySelector('[data-tipo="estado"]')

    rua.value = data.logradouro
    cidade.value = data.localidade
    estado.value = data.uf
}