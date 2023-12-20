$('document').ready(function(){
    let nivel = 1
    let resposta = "?"
    let output = ""
    let perguntas = []
    let conj_multiplicando
    let resposta_certa 
    let indice_pergunta = 0
    let acertos = 0
    let erros = 0
    let reseta_cont = 10
    let cont = reseta_cont
    let pontos = 0
    let total_acertos = 0
    let total_erros = 0
    let moedas_ganhas = 0
    let emoji_acertou = ["<img style=width:290px src=./image/emoticon_feliz.png>","<img style=width:290px src=./image/emoticon_acertou2.png>","<img style=width:220px src=./image/emoticon_acertou3.png>","<img style=width:230px src=./image/emoticon_acertou4.png>","<img style=width:200px src=./image/emoticon_acertou5.png>","<img style=width:280px src=./image/emoticon_acertou6.png>","<img style=width:280px src=./image/emoticon_acertou7.png>"]
    let emoji_errou = ["<img style=width:200px src=./image/emoticon_errou1.png>","<img style=width:240px src=./image/emoticon_errou2.png>","<img style=width:170px src=./image/emoticon_errou3.png>","<img style=width:200px src=./image/emoticon_errou4.png>","<img style=width:200px src=./image/emoticon_errou5.png>","<img style=width:210px src=./image/emoticon_errou6.png>","<img style=width:260px src=./image/emoticon_errou7.png>","<img style=width:250px src=./image/emoticon_errou8.png>"]
    let estrela = "<li><img src=./image/estrela.png><li>"

//FUNÇÃO RETORNA ARRAY
    function retornaArray(qdIndice,max){
        let tab = []

        while(tab.length < qdIndice){
            let indice = Math.floor(Math.random() * max) +1

            if($.inArray(indice,tab) > -1){
                indice = Math.floor(Math.random() * max) +1
            }
            else{
                tab.push(indice)
            }
        }
        return tab
    }
//CONTADOR
    $(function(){
        countdown = setInterval(function(){
            $('#clock').html("Tempo: " +cont)

            if(cont == 0){
                erros++
                $('#erros').html(erros)
                pontos = 0
                $('#pontos').html(pontos)
                $('#img').html("<img src=./image/emoticon_perdeutempo.png>")
                cont = reseta_cont + 1

                if(indice_pergunta > perguntas.length -2){
                    nivel++
                    criaPerguntas()
                    indice_pergunta = 0
                    carregaPergunta()
                }
                else{
                    indice_pergunta++
                    carregaPergunta()
                }
            }
            cont--
        },1000)
    })
//FUNÇÃO CRIA PERGUNTAS
    function criaPerguntas(){
        conj_multiplicando = retornaArray(5,10)

        for(i = 0; i < conj_multiplicando.length; i++){
            perguntas[i] = `${conj_multiplicando[i]} x ${nivel} = ${resposta}`
        }
    }
    
//FUNÇÃO CARREGA PERGUNTA
    function carregaPergunta(){
        let embaralha_opcoes = Math.floor(Math.random() * 3) +1

        output = perguntas[indice_pergunta]
        resposta_certa = conj_multiplicando[indice_pergunta] * nivel

        $('#output-play').html(output)
        $('#alternativa-1').html(resposta_certa +1)
        $('#alternativa-2').html(resposta_certa +3)
        $('#alternativa-3').html(resposta_certa +5)

        switch(embaralha_opcoes){
            case 1:
                $('#alternativa-1').html(resposta_certa)
                break
            case 2:
                $('#alternativa-2').html(resposta_certa)
                break
            case 3:
                $('#alternativa-3').html(resposta_certa)
        }

        if(nivel > 10){
            total_acertos = acertos
            total_erros = erros
            moedas_ganhas = pontos
            let qtd_estrelas

            if(total_acertos < 40){
                $('#mensagem').html("Você precisa melhorar!")
            }
            else{
                if(total_acertos >= 40){
                    qtd_estrelas = 1
                    $('#mensagem').html("Você pode fazer melhor!<br>Tente novamente.")
                }
                if(total_acertos >= 43){
                    qtd_estrelas = 2
                    $('#mensagem').html("Está quase bom, treine mais um pouco!")
                }
                if(total_acertos >= 46){
                    qtd_estrelas = 3
                    $('#mensagem').html("Muito bom!")
                }
                if(total_acertos >= 48){
                    qtd_estrelas = 4
                    $('#mensagem').html("Ótimo, está quase lá!.")
                }
                if(total_acertos >= 50){
                    qtd_estrelas = 5
                    moedas_ganhas += moedas_ganhas
                    $('#mensagem').html("Excelente!!!")
                }
            }

            for(i=0; i<qtd_estrelas; i++){
                $('#estrelas').append(estrela)
            }

            $('#output-play').css("display", 'none')
            $('#total-acertos').html("Total de acertos: " +total_acertos)
            $('#total-erros').html("Total de erros: " +total_erros)
            $('#moedas').html("Moedas acumuladas: " +moedas_ganhas)
            $('#container-alternativas').css('display','none')
            $('#img').css('display', 'none')
            $('#clock').css('display', 'none')
            $('.painel').css('display', 'none')
            reseta_cont = -1
        }
    }

//FUNÇÃO VERIFICA RESPOSTA
    function verificaResposta(){
        $(function(){
            $('#container-alternativas div').click(function(){
                valor = $(this).html()
                let emogi_acertou = Math.floor(Math.random() * 7) +1
                if(valor == resposta_certa){
                    acertos++
                    pontos = pontos + nivel
                    $('#acertos').html(acertos)
                    $('#pontos').html(pontos)
                    switch(emogi_acertou){
                        case 1:
                            $('#img').html(emoji_acertou[0])
                        break
                        case 2:
                            $('#img').html(emoji_acertou[1])
                        break
                        case 3:
                            $('#img').html(emoji_acertou[2])
                        break
                        case 4:
                            $('#img').html(emoji_acertou[3])
                        break
                        case 5:
                            $('#img').html(emoji_acertou[4])
                        break
                        case 6:
                            $('#img').html(emoji_acertou[5])
                        break
                        case 7:
                            $('#img').html(emoji_acertou[6])
                        break
                    }
                }
                else {
                    let emogi_errou = Math.floor(Math.random() * 8) +1
                    erros++
                    pontos = 0
                    $('#pontos').html(pontos)
                    $('#erros').html(erros)
                    switch(emogi_errou){
                        case 1:
                            $('#img').html(emoji_errou[0])
                        break
                        case 2:
                            $('#img').html(emoji_errou[1])
                        break
                        case 3:
                            $('#img').html(emoji_errou[2])
                        break
                        case 4:
                            $('#img').html(emoji_errou[3])
                        break
                        case 5:
                            $('#img').html(emoji_errou[4])
                        break
                        case 6:
                            $('#img').html(emoji_errou[5])
                        break
                        case 7:
                            $('#img').html(emoji_errou[6])
                        break
                        case 8:
                            $('#img').html(emoji_errou[7])
                        break
                    }
                }

                if(indice_pergunta > perguntas.length -2){
                    nivel++
                    criaPerguntas()
                    indice_pergunta = 0
                    carregaPergunta()
                }
                else{
                    indice_pergunta++
                    carregaPergunta()
                    
                }
                cont = reseta_cont
            })
        })            
    }
//GERADOR DE TABUADA
    $('.btn-choice-number').bind('click', function(){
        let msg = "";
        let n = parseInt($(this).val());

        for(let i=1; i<=10; i++){
            msg += `${n} x ${i} = ${(n*i)} <br>`
        }

        $('#output').html(msg);
    })

    criaPerguntas();
    carregaPergunta();
    verificaResposta();
})