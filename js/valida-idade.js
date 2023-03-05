export default function validaDataDeNascimento(input){
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


