//let titulo = document.querySelector('h1'); 
//Selecionando o título do html.

//titulo.innerHTML = 'Jogo do número secreto'; 
//innerHTML pega a informação dentro do HTML e altera (incluimos o título)

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

//Evite repetição de código. Para não ficar colocando as mesmas informações vamos usar uma função abaixo.
//abaixo criamos funções com e sem retorno e parametros,  

let listaDeNumeroSorteado = []; //não esquecer das chaves do contrário dá ruim.
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){//parametros (tag e texto)
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate:1.1});
}

function mensagemInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto' );
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 50');
}

mensagemInicial();

function verificarChute() // criando uma função (responsável por determinar alguma ação no código) nome deve ser descritivo.
    {
        let chute = document.querySelector('input').value; //value apenas para pegar o valor que foi digitado
        
        if (chute == numeroSecreto){
            exibirTextoNaTela('h1','Acertou!!!!!');
            let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativas}`;
            exibirTextoNaTela('p', mensagemTentativas);
            document.getElementById ('reiniciar').removeAttribute('disabled');//habilitar o botão novo jogo. Só ativa quando acerta o número. 
        } else {
            if (chute > numeroSecreto){
                exibirTextoNaTela('p', 'O número secreto é menor');
            } else {
                exibirTextoNaTela('p','O número secreto é maior');
            }
            tentativas++;
            limparCampo();
        }
    }

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt (Math.random()* numeroLimite + 1); 
    let quantidadeDeElementosNaLista = listaDeNumeroSorteado.length;

    if (quantidadeDeElementosNaLista == numeroLimite){ //limpando a lista de números salvos na lista caso atinja os 100
        listaDeNumeroSorteado = []; 
    }
    if (listaDeNumeroSorteado.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroSorteado.push(numeroEscolhido); //coloca os números sorteados em na lista e os exclui
        console.log(listaDeNumeroSorteado);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');//sem .value pois não queremos pegar o valor
    chute.value='';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true); //deixa ele desabilitado (true), até você ganhar o jogo.
}