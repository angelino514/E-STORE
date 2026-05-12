// ================================
// IMPORTAÇÃO DE DADOS EXTERNOS
// ================================
// Aqui estás a importar a base de dados dos produtos, carrinho, desconto e banners
import { itensVendas } from "./bancoDados.js"
import { carrinho } from "./JSS/dets.js"
import { desconto } from "./bancoDados.js"
import { itensBanners } from "./bancoDados.js"
import { favoritos } from "./JSS/dets.js"

let numero_favorito = document.querySelectorAll('.numero_favorito')

// ================================
// RENDERIZAÇÃO DOS PRODUTOS (0 - 10)
// ================================
itensVendas.slice(0, 10).forEach(itenVenda => {

   // criação dos elementos do produto (card)
   let itensButton = document.createElement('button')
   itensButton.classList.add('itensButton')
   itensButton.dataset.id = itenVenda.id

   let itenImg = document.createElement('img')
   itenImg.dataset.id = itenVenda.id

   itenImg.addEventListener('click', () => {
      enviarDetalhes(Number((itenImg.closest('.itensButton').dataset.id)))
   })

   let itenDetalhes = document.createElement('div')

   let itenP = document.createElement('p')
   itenP.classList.add('itenP')

   let itenIten = document.createElement('span')
   let itenPreco = document.createElement('span')
   let dwIcone = document.createElement('div')
   let icone = document.createElement('span')

   //EVENTO PARA ADICIONAR AO CARRINHO
   dwIcone.addEventListener('click', () => {
      adicionarItens({ id: Number(dwIcone.closest('.itensButton').dataset.id), dados: 'carrinho' })
   })

   // inserção no DOM (lista principal)
   document.querySelector('.list-produtos').appendChild(itensButton)
   itensButton.appendChild(itenImg).src = itenVenda.img
   itensButton.appendChild(itenDetalhes)
   itenDetalhes.appendChild(itenP)
   itenP.appendChild(itenIten).textContent = itenVenda.iten
   itenP.appendChild(itenPreco).textContent = itenVenda.preco + 'Kz'

   itenDetalhes.appendChild(dwIcone)
   dwIcone.appendChild(icone)
   icone.textContent = "add_shopping_cart"

   itensButton.setAttribute("id", "itensButton")
   itenImg.classList.add('imgProdutos')
   itenDetalhes.classList.add('detalhes-produtos')
   itenIten.classList.add('precos-name')
   itenPreco.classList.add('precos-name')
   icone.classList.add('material-symbols-outlined')
})


// ================================
// RENDERIZAÇÃO DOS PRODUTOS (10 - 30)
// ================================
itensVendas.slice(10, 30).forEach(itenVenda => {

   // criação dos elementos do produto (card)
   let itensButton = document.createElement('button')
   itensButton.classList.add('itensButton')
   itensButton.dataset.id = itenVenda.id

   let itenImg = document.createElement('img')
   itenImg.dataset.id = itenVenda.id

   itenImg.addEventListener('click', () => {
      enviarDetalhes(Number((itenImg.closest('.itensButton').dataset.id)))
   })

   let itenDetalhes = document.createElement('div')

   let itenP = document.createElement('p')
   itenP.classList.add('itenP')

   let itenIten = document.createElement('span')
   let itenPreco = document.createElement('span')
   let dwIcone = document.createElement('div')
   let icone = document.createElement('span')

   //EVENTO PARA ADICIONAR AO CARRINHO
   dwIcone.addEventListener('click', () => {
      adicionarItens({ id: Number(dwIcone.closest('.itensButton').dataset.id), dados: 'carrinho' })
   })


   // inserção no DOM (lista principal)
   document.querySelector('.seg-lista').appendChild(itensButton)
   itensButton.appendChild(itenImg).src = itenVenda.img
   itensButton.appendChild(itenDetalhes)
   itenDetalhes.appendChild(itenP)
   itenP.appendChild(itenIten).textContent = itenVenda.iten
   itenP.appendChild(itenPreco).textContent = itenVenda.preco + 'Kz'

   itenDetalhes.appendChild(dwIcone)
   dwIcone.appendChild(icone)
   icone.textContent = "add_shopping_cart"

   itensButton.setAttribute("id", "itensButton")
   itenImg.classList.add('imgProdutos')
   itenDetalhes.classList.add('detalhes-produtos')
   itenIten.classList.add('precos-name')
   itenPreco.classList.add('precos-name')
   icone.classList.add('material-symbols-outlined')
})


// ================================
// ENVIAR PARA DETALHES 
// ================================
function enviarDetalhes(id) {
   window.location.href = "CPSS/dets.html?id=" + id
}

//======================
//ELEMENTOS DINAMICOS DAS LISTAS
//===================
function mostrarGeral(itensGerais) {

   // PREPARAR A LISTA PARA RECEBER NOVOS ITENS
   let container_auto_list = document.querySelector('.container_auto_list')
   container_auto_list.innerHTML = ''

   itensGerais.forEach(itengeral => {

      let div_container_list = document.createElement('div')
      div_container_list.classList.add('div_container_list')
      div_container_list.dataset.tipo = itengeral.dados
      div_container_list.dataset.nome = itengeral.iten
      div_container_list.dataset.id = itengeral.id
      div_container_list.dataset.cor = itengeral.cor
      div_container_list.dataset.tamanho = itengeral.tamanho

      let itens_container_list = document.createElement('div')
      itens_container_list.classList.add('itens_container_list')
      itens_container_list.classList.add('fadeUP_list')

      let itens_img_list = document.createElement('img')
      itens_img_list.classList.add('itens_img_list')
      itens_img_list.src = itengeral.img

      let itens_texto_list = document.createElement('p')
      itens_texto_list.classList.add('itens_texto_list')
      itens_texto_list.textContent = itengeral.iten

      let container_qt_list = document.createElement('div')
      container_qt_list.classList.add('container_qt_list')
      container_qt_list.textContent = itengeral.quantidade
      container_qt_list.classList.add('fadeUP_list')


      let container_more_list = document.createElement('button')
      container_more_list.classList.add('container_more_list')
      container_more_list.textContent = ':'
      container_more_list.classList.add('fadeUP_list')

      let remover_itens_list = document.createElement('button')
      remover_itens_list.classList.add('remover_itens_list')
      remover_itens_list.classList.add('material-symbols-outlined')
      remover_itens_list.textContent = 'delete'
      remover_itens_list.classList.add('fadeUP_list')

      //=====================================
      // ENVIAR OS DADOS COM BASE DO TIPO DE LISTA
      //======================================
      if (itengeral.dados == 'favoritos') {
         remover_itens_list.addEventListener('click', () => {
            // ENVIAR OS DADOS DO ELEMENTO PAI 
            removerItensList(remover_itens_list.closest('.div_container_list'))

            // ACTULIZAR ITENS
            actualizar()
         })
      }

      if (itengeral.dados == 'carrinho') {
         remover_itens_list.addEventListener('click', () => {
            // ENVIAR OS DADOS DO ELEMENTO PAI 
            removerItensList(remover_itens_list.closest('.div_container_list'))

            // ACTULIZAR ITENS
            actualizar()
         })
      }


      let container_auto_list = document.querySelector('.container_auto_list')

      container_auto_list.appendChild(div_container_list)
      div_container_list.appendChild(itens_container_list)
      itens_container_list.appendChild(itens_img_list)
      itens_container_list.appendChild(itens_texto_list)

      div_container_list.appendChild(container_qt_list)
      div_container_list.appendChild(container_more_list)
      div_container_list.appendChild(remover_itens_list)
   })
}

//=============================
//REMOVER ITENS DA LISTA FAVORITO E CARRINHO
//=============================
function removerItensList(valor) {
   let valorQuantidade = valor.querySelector('.container_qt_list')

   // DADOS DO ITEN QUE FOI CLICADO
   let id = valor.dataset.id
   let iten = valor.dataset.nome
   let cor = valor.dataset.cor
   let tamanho = valor.dataset.tamanho
   let tipo = valor.dataset.tipo

   // VERIFICAR SE EXISTE E PERTENCE A QUE LISTA 
   if (valor.dataset.tipo == 'carrinho') {
      let existeItem = carrinho.find(p =>
         p.id == id && p.cor == cor
         && p.tamanho == tamanho &&
         p.iten == iten && p.dados == tipo
      )

      // DECREMENTAR SE EXISTE O ITEN NA LISTA DO CARRINHO
      decrementar(existeItem)
   }

   // VERIFICAR SE EXISTE E PERTENCE A QUE LISTA DOS FAVORITOS
   if (valor.dataset.tipo == 'favoritos') {
      let existeItem = favoritos.find(p =>
         p.id == id && p.cor == cor
         && p.tamanho == tamanho &&
         p.iten == iten && p.dados == tipo
      )

      // DECREMENTAR SE EXISTE O ITEN NA LISTA
      decrementar(existeItem)
   }

   function decrementar(existeItem) {
      // DECREMENTAR A QUANTIDADE DE ITENS
      if (existeItem) {
         if (existeItem.quantidade >= 1) {
            existeItem.quantidade -= 1
         }

         // EXIBIR NO HTML
         valorQuantidade.textContent = existeItem.quantidade

         if (existeItem.quantidade === 0) {

            // SE A QUANTIDADE FOR IGUAL A ZERO ATIVA A FUNACAO REMOCAO ORIGINAL
            remocaoOriginal(id, iten, cor, tamanho, tipo, valor)
         }
      }
   }
}

function remocaoOriginal(id, iten, cor, tamanho, tipo, valor) {

   if (tipo == 'carrinho') {
      // PROCURAR A POSICAO DO ITEN NO CARRINHO
      let indice = carrinho.findIndex(p =>
         p.id == id &&
         p.cor == cor &&
         p.tamanho == tamanho &&
         p.dados == tipo
      )
      if (indice !== -1) {
         carrinho.splice(indice, 1)
         remocaoFinal(valor)
      }
   }

   if (tipo == 'favoritos') {
      // PROCURAR A POSICAO DO ITEN NOS FAVORITOS
      let indice = favoritos.findIndex(p =>
         p.id == id &&
         p.cor == cor &&
         p.tamanho == tamanho &&
         p.dados == tipo
      )
      if (indice !== -1) {
         favoritos.splice(indice, 1)
         remocaoFinal(valor)
      }
   }

   // REMOVER PERMANENTEMENTE
   function remocaoFinal(valor) {
      valor.classList.add('fadeUP')
      setTimeout(() => {
         valor.remove()
      }, 100)
   }
}

// ================================
// FILTRO DE PRODUTOS PROMOÇÃO
// ================================
const promoces = itensVendas.filter(p => p.promocao == true)
const bannersImg = document.querySelectorAll('.bannersImg')
bannersImg.forEach((banner, index) => {

   const item = promoces[index] // produto atual da promoção

   // Cria a imagem do banner
   const img = document.createElement('img')
   img.src = item.img
   img.classList.add('imgBanner')

   // Container principal do banner
   const container_banners = document.createElement('div')
   container_banners.classList.add('container_banners')

   // Sub-container de promoção
   const container_Promo = document.createElement('div')
   container_Promo.classList.add('container_Promo')

   // Preço do produto
   const preco = document.createElement('p')
   preco.textContent = `${item.preco} Kz`
   preco.classList.add('promo_preco')

   // Percentagem de promoção
   const promo_percemtagem = document.createElement('p')
   promo_percemtagem.classList.add('promo_percemtagem')
   promo_percemtagem.textContent = `Promoção com desconto ${desconto}%`

   // Botão de compra
   const botao = document.createElement('button')
   botao.textContent = 'Comprar Agora'
   botao.dataset.id = item.id
   botao.classList.add('bannerButton', 'itens-Button')

   // Montagem da estrutura
   container_Promo.appendChild(preco)
   container_Promo.appendChild(promo_percemtagem)
   container_Promo.appendChild(botao)

   container_banners.appendChild(container_Promo)

   banner.appendChild(img)
   banner.appendChild(container_banners)
})


// ================================
// FILTRO DE CATEGORIAS
// ================================
const tipoCateogoria = []
for (let i = 0; i < itensVendas.length; i++) {
   if (!tipoCateogoria.some(obj => obj.categoria === itensVendas[i].categoria)) {
      tipoCateogoria.push(itensVendas[i])
   }
}

// criação dos botões de categoria (carrossel, navbar)
tipoCateogoria.forEach(listCatg => {
   let catButton = document.createElement('button')
   catButton.dataset.id = listCatg.id

   let imgCtg = document.createElement('img')
   imgCtg.src = listCatg.img

   let textCt = document.createElement('p')
   textCt.textContent = listCatg.categoria

   catButton.setAttribute("id", "btt-itens-categorias")
   imgCtg.classList.add('imgCtg')
   textCt.classList.add('textCt')

   catButton.addEventListener('click', () => {
      filtarCategoria(Number(catButton.dataset.id))
   })

   document.querySelector('.itens-carrossel').appendChild(catButton)
   catButton.appendChild(imgCtg)
   catButton.appendChild(textCt)

   let ancora = document.createElement('button')
   ancora.textContent = listCatg.categoria
   ancora.dataset.id = listCatg.id

   ancora.setAttribute("id", "links-scroll")

   ancora.addEventListener('click', () => {
      filtarCategoria(Number(ancora.dataset.id))
   })

   document.getElementById('scroll-navbar').appendChild(ancora)
})


//=============================
// FUNCAO FILTRAR CATEGORIA 
//===========================
function filtarCategoria(id) {
   for (let i = 0; i < itensVendas.length; i++) {
      if (id == itensVendas[i].id) {
         paginaCategoaria(itensVendas[i].categoria)
      }
   }
}

// ENVIAR DADOS CATEGORIA
function paginaCategoaria(dadosCategoria) {
   window.location.href = "CPSS/filter.html?dadosCategoria=" + dadosCategoria
}


// ================================
// PRODUTOS DESTAQUE
// ================================
let listaDestaque = itensVendas.filter(ld => ld.destaque == true)
listaDestaque.forEach(ldO => {

   let butDesatque = document.createElement('button')
   butDesatque.setAttribute("id", "itensDestaque")
   butDesatque.classList.add('itens-Button')

   let imgDestaque = document.createElement('img')
   butDesatque.dataset.id = ldO.id
   imgDestaque.classList.add('viewImg')
   imgDestaque.src = ldO.img


   document.querySelector('.itens-destaques').appendChild(butDesatque)
   butDesatque.appendChild(imgDestaque)
})


// transformar texto
function normalizar(texto) {
   return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()

}

// ================================
//  ABRIR A CAICA DE PESQUISA E SUGESTÕES
// ================================
document.querySelectorAll('.abrir-pesquisa').forEach(abriPesquisa => {
   abriPesquisa.addEventListener('click', () => {
      document.querySelector('.sugestoes').classList.add('sugestoes-activo')
   })
})



// ================================
//  FECHAR A CAIXA DE PESQUISA E SUGESTÕES
// ================================
document.querySelector('.voltar_segestoes').addEventListener('click', () => {
   document.querySelector('.sugestoes').classList.remove('sugestoes-activo')
})

// funcao de busca e segestoes de  pesquisa...
document.getElementById('input-pesquisar').addEventListener('input', () => {
   let inputPesquisar = document.getElementById('input-pesquisar').value

   let sugestoes = []
   document.querySelector('.dw-sugestoes').innerHTML = ""

   if (!inputPesquisar == "") {
      if (!inputPesquisar.trim() == "") {
         for (let i = 0; i < itensVendas.length; i++) {
            if (normalizar(itensVendas[i].iten).includes(normalizar(inputPesquisar))) {
               if (!sugestoes.some(obj => obj.iten === itensVendas[i].iten)) {
                  sugestoes.push(itensVendas[i])
               }
            }
         }
      }

   }

   // enviar dados ao html 
   for (let i = 0; i < sugestoes.length; i++) {
      let sugstButton = document.createElement('button')
      document.querySelector('.dw-sugestoes').appendChild(sugstButton)
      sugstButton.textContent = sugestoes[i].iten
      sugstButton.addEventListener('click', () => {
         enviarDados(sugstButton.textContent)
      })
   }
})

// PEGAR O INPUT DE PESQUISA
const inputpesquisar_Enter = document.getElementById('input-pesquisar')

// ESCUTAR QUANDO UMA TECLA FOR PRESSIONADA
inputpesquisar_Enter.addEventListener('keydown', (event) => {

   // VERIFICAR SE A TECLA PRESSIONADA FOI ENTER
   if (event.key === "Enter") {
      if (inputpesquisar_Enter.value !== '') {
         enviarDados(normalizar(inputpesquisar_Enter.value))
      }
   }
})

// funcao para enviar dados apartir do input 
document.querySelector('.button-pesquisar').addEventListener('click', () => {
   let inputPesquisar = document.getElementById('input-pesquisar').value
   if (inputPesquisar !== "") {
      enviarDados(inputPesquisar)
   }
})


//  funcao enviar dados para  a pagina de resultado 
function enviarDados(dadosPesquisa) {
   window.location.href = "CPSS/search.html?dadosPesquisa=" + dadosPesquisa
   let inputPesquisar = document.getElementById('input-pesquisar')
   inputPesquisar.value = ""
}

let coresSelecinada = ""
let tamanhoSelionado = ""

//=======================================
// ADICIONAR ITENS A LISTA 
//======================================
function adicionarItens({ id, dados }) {

   for (let i = 0; i < itensVendas.length; i++) {
      if (id === itensVendas[i].id) {

         coresSelecinada = itensVendas[i].cores[0]
         tamanhoSelionado = itensVendas[i].tamanho[0]


         if (coresSelecinada != '' && tamanhoSelionado != '') {
            // =======================================
            // DECISAO ONDE DEVE SER ADICIONADO O ITEM 
            //=========================================
            if (dados == 'carrinho') {

               //VERIFICAR SE EXISTE NO CARRINHO
               let existeItem = carrinho.find(p =>
                  p.id == id && p.cor == coresSelecinada && p.tamanho == tamanhoSelionado
               )

               //SE EXISTE NO CARRINHO ENCREMENTA A QUANTIDADE 
               if (existeItem && dados == 'carrinho') { existeItem.quantidade++ }

               // SE NAO EXISTE ADICIONA UM ITEM AO CARRINHO
               else {
                  carrinho.push({ id: itensVendas[i].id, iten: itensVendas[i].iten, img: itensVendas[i].img, preco: itensVendas[i].preco, cor: coresSelecinada, descricao: itensVendas[i].itenDesc, tamanho: tamanhoSelionado, quantidade: 1, dados: dados })
               }
            }

            //MESSAGEM
            avisoGeral('add')
         }
      }
   }


   // ACTULIZAR ITENS
   actualizar()
}

// ============================
// FUNCAO DE AVISO GERAL ( EXIBIR MENSAGEM DE AVSISO )
//=============================
function avisoGeral(valor) {
   let sect_avisoAdicionar = document.querySelector('.sect_avisoAdicionar')
   sect_avisoAdicionar.classList.add('activo_avisoAdicionar')

   let processo = document.querySelector('.processo')
   let avisoAdicionar = document.querySelector('.avisoAdicionar')

   if (valor == 'favorito') {
      avisoAdicionar.textContent = 'lista vazia'
      processo.classList.add('processo_none')
   }

   else if (valor == 'carrinho') {
      avisoAdicionar.textContent = 'carrinho vazio'
      processo.classList.add('processo_none')
   }

   else if (valor == 'add') {
      avisoAdicionar.textContent = 'item adicionado ao carrinho'
   }
   removerMensgem()

   // ACTULIZAR ITENS
   actualizar()
}


// ================================
// LIMPAR MENSAGENS
// ================================
function removerMensgem() {
   let activo_avisoAdicionar = document.querySelector('.activo_avisoAdicionar')
   if (activo_avisoAdicionar) {
      setTimeout(() => {
         activo_avisoAdicionar.classList.remove('activo_avisoAdicionar')
      }, 1000)
   }
}

// ======================================
// FUNCAO PARA MANIPULAR A LISTA DE ITENS
//=======================================
const verItens = document.querySelectorAll('.verItens')
verItens.forEach(iten => {
   iten.addEventListener('click', () => {
      verItensLista(iten.value)
   })
})

function verItensLista(valor) {
   let section_list_geral = document.querySelector('.section_list_geral')

   function addClasses() {
      section_list_geral.classList.add('section_list_geral_activo')
   }

   if (valor === 'carrinho') {
      if (carrinho.length !== 0) {
         addClasses()
         mostrarGeral(carrinho)
      }
      else { avisoGeral('carrinho') }
   }

   else if (valor === 'favoritos') {
      if (favoritos.length !== 0) {
         addClasses()
         mostrarGeral(favoritos)
      }

      else {
         avisoGeral('')
      }
   }

   // REMOVER A LISTA 
   else if (valor === 'remover') {
      section_list_geral.classList.remove('section_list_geral_activo')
   }
   // ACTULIZAR ITENS
   actualizar()
}

// =============================Q===
// BANNERS SECUNDÁRIOS
// ================================
const bannersDois = document.querySelectorAll('.bannersDois')
for (let i = 0; i < itensBanners.length; i++) {
   let imgBannersDois = document.createElement('img')
   imgBannersDois.classList.add('imgBannersDois')
   imgBannersDois.src = itensBanners[i].img

   let textoBanners = document.createElement('p')
   textoBanners.textContent = itensBanners[i].texto
   textoBanners.classList.add('textoBanners')

   bannersDois[i].appendChild(imgBannersDois)
   bannersDois[i].appendChild(textoBanners)
}


//==============================
// ACTUALIZAR ITENS
//==============================
function actualizar() {
   localStorage.setItem("favoritos", JSON.stringify(favoritos))
   localStorage.setItem("carrinho", JSON.stringify(carrinho))

   let numeros_itens = document.querySelectorAll('.numero_itens')
   numeros_itens.forEach(numero => {
      if (numero.dataset.nome == 'favorito') {
         numero.textContent = favoritos.length
      }

      if (numero.dataset.nome == 'carrinho') {
         numero.textContent = carrinho.length
      }
   })
}

// ACTULIZAR ITENS
actualizar()
