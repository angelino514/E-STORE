import { itensVendas } from "../bancoDados.js"
import { carrinho } from "./dets.js"


/* ================================
   CAPTURA PARÂMETROS DA URL
   (usado para filtrar categoria)
================================ */
const params = new URLSearchParams(window.location.search)
const dadosCategoria = params.get("dadosCategoria")


/* ================================
   CRIAÇÃO DOS BOTÕES DE CATEGORIAS
================================ */
const tipoCategoria = []
for (let i = 0; i < itensVendas.length; i++) {
   if (!tipoCategoria.some(obj => obj.categoria == itensVendas[i].categoria)) {
      tipoCategoria.push(itensVendas[i])
   }
}

/* ================================
   NAVBAR FILTRO POR CATEGORIA
================================ */
tipoCategoria.forEach(tipo => {
   let button_filter = document.createElement('button')
   button_filter.textContent = tipo.categoria

   let navbar_fillter = document.querySelector('.navbar-fillter')


   if (navbar_fillter) {
      navbar_fillter.appendChild(button_filter)
      button_filter.classList.add('button_filter')

      button_filter.addEventListener('click', () => {
         geralFilter(button_filter.textContent)
      })
   }
})


//=======================================================
// FUNCAO FILTRAR OS ITENS DINAMICOS 
//====================================================
function geralFilter(valor) {
   //PRRPARAR O CONTAINER PARA RECEBER NOVOS VALORES 
   let container_fillter = document.querySelector('.container-fillter')
   container_fillter.innerHTML = ''

   // FILTRAR ITENS COM BASE NO VALOR CLICADO
   let listaFiltrada = itensVendas.filter(p => p.categoria === valor)

   listaFiltrada.forEach(filterView => {

      let itbtFilter = document.createElement('button')
      itbtFilter.classList.add('itbtFilter')
      itbtFilter.setAttribute("id", "buttonsFilter")
      itbtFilter.dataset.id = filterView.id

      let imgFillter = document.createElement('img')
      imgFillter.dataset.id = filterView.id
      imgFillter.classList.add('imgFillter')
      imgFillter.src = "../IMGS/../" + filterView.img

      let dwFillter = document.createElement('div')
      dwFillter.classList.add('dwFillter')

      let pwFillter = document.createElement('p')
      pwFillter.classList.add('pwFillter')


      let spanFillterNome = document.createElement('span')
      spanFillterNome.textContent = filterView.iten
      spanFillterNome.classList.add('spanFillter')


      let spanFillterPreco = document.createElement('span')
      spanFillterPreco.textContent = filterView.preco + 'Kz'
      spanFillterPreco.classList.add('spanFillter')

      let dwIocneFillter = document.createElement('div')
      dwIocneFillter.classList.add('dwIocneFillter')

      let icone = document.createElement('span')
      icone.classList.add('material-symbols-outlined')
      icone.textContent = 'add_shopping_cart'



      if (container_fillter) {
         container_fillter.appendChild(itbtFilter)
      }
      itbtFilter.appendChild(imgFillter)
      itbtFilter.appendChild(dwFillter)
      dwFillter.appendChild(pwFillter)
      pwFillter.appendChild(spanFillterNome)
      pwFillter.appendChild(spanFillterPreco)
      dwFillter.appendChild(dwIocneFillter)
      dwIocneFillter.appendChild(icone)

      //EVENTO PARA ADICIONAR AO CARRINHO
      dwIocneFillter.addEventListener('click', () => {
         adicionarItens({ id: Number(dwIocneFillter.closest('.itbtFilter').dataset.id), dados: 'carrinho' })
      })

      /* navegação para página de detalhes */
      imgFillter.addEventListener('click', () => {
         enviarFillter(itbtFilter.dataset.id)
      })
   })
}
geralFilter(dadosCategoria)



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

   //COMPARAR COM BASE NO VALOR DE CADA BUTTON CLICADO
   if (valor === 'carrinho') {
      if (carrinho.length !== 0) {
         //  addClasses()
         mostrarGeral(carrinho)
      }
      else { avisoGeral('carrinho') }
   }

   // REMOVER A LISTA 
   else if (valor === 'remover') {
      section_list_geral.classList.remove('section_list_geral_activo')
   }
   // ACTULIZAR ITENS
   actualizar()
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
      itens_img_list.src = '../IMGS/../' + itengeral.img

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

//=======================================================
// FUNCAO : POSICAO DO ITEN NA LISTA E REMOCAO PERMANENTE
//========================================================
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

/* ================================
   NAVEGAÇÃO PARA PÁGINA DE DETALHES
================================ */
function enviarFillter(id) {
   window.location.href = "CPSS/../dets.html?id=" + id
}

//==============================
// ACTUALIZAR ITENS
//=============================
function actualizar() {
   localStorage.setItem("carrinho", JSON.stringify(carrinho))

   let numeros_itens = document.querySelectorAll('.numero_itens')
   numeros_itens.forEach(numero => {
      if (numero.dataset.nome == 'carrinho') {
         numero.textContent = carrinho.length
      }
   })
}
// ACTULIZAR ITENS
actualizar()