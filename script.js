let seuVotoPara = document.querySelector('.lado1-1 span')
let cargo = document.querySelector('.lado1-2 span')
let descricao = document.querySelector('.lado1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.lado2')
let numeros = document.querySelector('.lado1-3')
let votos = []

let etapaAtual = 0
let numero = ''
let votoBranco = false

function comecarEtapa() {
    let etapa = etapas[etapaAtual]
    let numeroHtml = ''
    numero = ''
    votoBranco = false
    

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
            numeroHtml += '<div class="numero "></div>'
        }
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
}


function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero == numero) {
            return true
        } else {
            return false
        }
    })

    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.nome}<br> Partido: ${candidato.partido} `

        // adidionando a foto
        let fotoHtml = ''
        for (let i in candidato.fotos) {
            if(candidato.fotos[i].small){
            fotoHtml += `<div class="lado2-img small"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }else {
               fotoHtml += `<div class="lado2-img"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }
        }

        lateral.innerHTML = fotoHtml
    } else {
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }

}

function clicou(n) {
    let elnumero = document.querySelector('.numero.pisca')
    if (elnumero !== null) {

        elnumero.innerHTML = n
        numero = `${numero}${n}`
        elnumero.classList.remove('pisca')

        // pegar o proximo elemento
        if (elnumero.nextElementSibling !== null) {
            elnumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface()
        }

    }
}

function confirma() {
    let etapa = etapas[etapaAtual]
    let confirmaVoto = false


    if (votoBranco === true) {
        confirmaVoto = true
        console.log('confirmando VOTO EM BRANCO')
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })

    } else if (numero.length === etapa.numeros) {

        confirmaVoto = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
        console.log('Confirmado como ' + numero)
    }
    if(confirmaVoto){
        etapaAtual ++
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa()
        } else {
            document.querySelector('.tela').innerHTML = ` <div class="aviso--gigante pisca "> FIM </div>`
            console.log(votos)
            
        }
    }
}

function corrige() {
    comecarEtapa()
}

function branco() {
    numero === ''
    lateral.innerHTML = ''
    votoBranco = true
    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block'
    numeros.innerHTML = ''
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'


}



comecarEtapa()