
// destacar municípios no mapa

// criar tooltip para os municípios

// criar pop-up ao clicar em um municipio



function converteNumero (numero) {
    numeroConvertido = parseFloat(numero.replace(',','.').replace(' ',''))
    return numeroConvertido
}


let nomeMunicipio
let categoriaMunicipio
let arrayMunicipio = []


// carregando os dados json dos municipios
function carregandoDadosJson () {
    fetch('dados_meis.json')
    .then(response => response.json())
    .then(data => {

        // para cada municipio fazer tais ações
        for (let municipio of data) {

            // console.log(municipio)

            arrayMunicipio = [
                converteNumero(municipio['2018']), 
                converteNumero(municipio['2019']), 
                converteNumero(municipio['2020']), 
                converteNumero(municipio['2021']), 
            ]
            // console.log('array: ', arrayMunicipio)

            nomeMunicipio = municipio['Município']
            categoriaMunicipio = municipio['categoria']


            // console.log(municipio);

            // console.log(nomeMunicipio)

            // executando uma função para cada mapa
            gerandoMapa('exosfera', nomeMunicipio, categoriaMunicipio)
            gerandoMapa('mesosfera', nomeMunicipio, categoriaMunicipio)
            gerandoMapa('troposfera', nomeMunicipio, categoriaMunicipio)

        }        

    })    

}


// let mapaAlagoas = document.querySelectorAll('#mapa-'+ camada + ' > path')

// mapaAlagoas.forEach(municipio => {
//     municipio.addEventListener('click', e => {
//         console.log(municipio)
//         // graficoChartJs(nomeMunMapa, meisRegistrados)
//     })
// })

// municipio.addEventListener('click', e => {
//     console.log(nomeMunMapa)
//     graficoChartJs(nomeMunMapa, meisRegistrados)
// })


// DESATIVADO TEMPORAREAMENTE
carregandoDadosJson()


// variável do nível da camada/categoria: 'alta', 'regular' ou 'baixa'
let nivelCamada

// função para personalizar o mapa de acordo com a camada/categoria do município
function gerandoMapa (camada, nomeMunicipio, categoriaMunicipio) {

    if (camada == 'exosfera') {
        nivelCamada = 'alto'

    } else if (camada == 'mesosfera') {
        nivelCamada = 'regular'

    } else if (camada == 'troposfera') {
        nivelCamada = 'baixo'
    }

    let mapaAl = document.querySelectorAll('#mapa-'+ camada + ' > path')

    // mapaAl.forEach(municipio => {
    //     municipio.addEventListener('click', e => {
    //         console.log(municipio.innerHTML)
    //         // graficoChartJs(nomeMunMapa, meisRegistrados)
    //     })
    // })

    // console.log(nomeMunicipio)
    for (let municipio of mapaAl) {
        
        let conteudoMuninicipio = municipio.querySelector('title')
        // let idMunicipio = municipio.id

        let nomeMunMapa = conteudoMuninicipio.innerHTML

        if (nomeMunicipio == conteudoMuninicipio.innerHTML) {

            if (categoriaMunicipio == nivelCamada) {
                // console.log('é alto! ', categoriaMunicipio)
            } else {
                municipio.style.cursor = 'unset'
                // municipio.style.stroke = 'rgb(98 93 245 / 29%)'

                municipio.classList.add('desativado')
            }

            // console.log('match!', conteudoMuninicipio.innerHTML, nomeMunicipio)

        } else {

            // console.log('ops')

        }

        
        municipio.addEventListener('click', e => {
            aparecerPopUp()
            console.log(nomeMunMapa)
            graficoChartJs(nomeMunMapa, arrayMunicipio)
            document.querySelector('.texto-municipio').innerHTML = nomeMunMapa
        })
        


        // console.log(conteudoMuninicipio.innerHTML, '-', idMunicipio)
    }

    

}

let botaoFecharPopUp = document.querySelector('#fechar-pop-up')

botaoFecharPopUp.addEventListener('click', sumirPopUp)

function aparecerPopUp () {
    document.querySelector('div.pop-up').style.display = 'block'
    document.querySelector('.container-pop-up').style.display = 'block'
    aviao.style.display = 'none'
}

function sumirPopUp () {
    document.querySelector('div.pop-up').style.display = 'none'
    document.querySelector('.container-pop-up').style.display = 'none'
    aviao.style.display = 'block'
}





let aviao = document.querySelector('.aviao');
// console.log(aviao)

function escutaRolagem () {
    // console.log('rolando a página')


    let sessoesPagina = document.querySelectorAll('section.camada')
    
    for (let secao of sessoesPagina) {

        let posicaoSecao = secao.getBoundingClientRect();
        // console.log(posicaoSecao.top);
        
        // let alvo = secao.dataset.alvo
        // console.log(alvo)
        // console.log(posicaoSecao.top)

        if (posicaoSecao.top <= 0) {
            // console.log(secao.classList)
        }
    }

   
}

window.addEventListener('scroll', escutaRolagem);


function detectandoRolagem(){
    var ultimaRolagem = 0;
  
    window.onscroll = function() {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value
  
        if (currentScroll > 0 && ultimaRolagem <= currentScroll){
            ultimaRolagem = currentScroll;
            // console.log('scroll DOWN')

            aviao.style.transform = 'translate(-50%, 0) rotate(0deg)'

        } else {
            ultimaRolagem = currentScroll;
            // console.log('scroll UP')

            aviao.style.transform = 'translate(-50%, 0) rotate(180deg)'

        }
    };
}

detectandoRolagem();


// cherando variáveis com os dados do Brasil
meisRegistrados = [56, 67, 87, 119]


// criando gráfico do Brasil
graficoChartJs('Maceió', meisRegistrados)

function recriandoGrafico () {
    // apagando e recriando o elemento 'canvas' para resetar os dados do gráfico
    let chartElement = document.getElementById("chart");    
    chartElement.remove();
  
    let canvaElement = document.createElement('canvas');
  
    canvaElement.setAttribute("id", "chart");
    canvaElement.setAttribute("class", "grafico_chart_js");
    canvaElement.setAttribute("width", 300);
    canvaElement.setAttribute("height", 320)
    
    document.querySelector(".grafico").appendChild(canvaElement);  
}

  
function graficoChartJs(nomeMunicipio, meisRegistrados) {

    // chamando a função de apagar e recriar elemento 'canvas'
    recriandoGrafico()    

    let grafico = new Chart('chart', {
        type: "line",
        data: {
        // valores do eixo X
        
        labels: ['2018', '2019', '2020', '2021'],        
        datasets: [
            {
            // valores do eixo Y
            data: meisRegistrados,
            borderColor: '#ffff',
            fontColor: '#fff',
            // fill: true,
            label: 'MEIs registrados em ' +  nomeMunicipio
        }
        ]},
        options: {
            // deixando gráfico responsivo
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },

            layout: {
                padding: 30
            },
        
            legend: {
                labels: {
                   fontColor: 'white'
                }
             },

            interaction: {
                intersect: false,
                mode: 'index',
            },

            plugins: {
                legend: {
                    labels: {font: {size: 12,}},
                    fontColor: "white",                     
                },          
            },
            scales: {
                
                y: {
                    display: true // Hide Y axis labels
                },
                x: {
                    display: true // Hide X axis labels
                }
            }       

        }
    });   

    return grafico;
        
}