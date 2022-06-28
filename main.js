

let aviao = document.querySelector('.aviao');
console.log(aviao)

function escutaRolagem () {
    console.log('rolando a página')


    let sessoesPagina = document.querySelectorAll('section.camada')
    
    for (let secao of sessoesPagina) {

        let posicaoSecao = secao.getBoundingClientRect();
        console.log(posicaoSecao.top);
        
        // let alvo = secao.dataset.alvo
        // console.log(alvo)
        // console.log(posicaoSecao.top)

        if (posicaoSecao.top <= 0) {
            console.log(secao.classList)
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
            console.log('scroll DOWN')

            aviao.style.transform = 'translate(-50%, -12%) rotate(0deg)'

        } else {
            ultimaRolagem = currentScroll;
            console.log('scroll UP')

            aviao.style.transform = 'translate(-50%, -12%) rotate(180deg)'

        }
    };
}

detectandoRolagem();