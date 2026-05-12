// importar as listas de produtos do ficheiro bancoDados.js
import { itensVendas } from "../bancoDados.js";


// Pegar o id dos produtos a partir da URL (ex: ?id=1)
const params = new URLSearchParams(window.location.search)

// carrinho é carregado do localStorage ou começa vazio
export let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

// lista de favoritos do localStorage ou comeca vazio
export let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []


// ------------------------------
// PEGAR ID DO PRODUTO DA URL
// ------------------------------
let id = Number(params.get("id")) // id do item clicado...
let id_detalhes_face = document.getElementById('id_detalhes_face')

//=========================
// VARIAVEIS GLOBAIS 
//=======================
let tamanhoSelionado = ""
let coresSelecinada = ""

coresSelecinada = 'Azul'
tamanhoSelionado = 'XL'

if (id) {
   // exibir informacoes do item clicado... 
   function informacoesItem() {
      for (let i = 0; i < itensVendas.length; i++) {
         if (id === itensVendas[i].id) {
            let dO_detlhes = document.createElement('div')
            dO_detlhes.classList.add('dO_detlhes')
            dO_detlhes.dataset.id = itensVendas[i].id

            let dt_sliders = document.createElement('div')
            dt_sliders.classList.add('dt_sliders')

            let carrossel_Imgs = document.createElement('div')
            carrossel_Imgs.classList.add('carrossel_Imgs')

            let buttons_Carrossel = document.createElement('div')
            buttons_Carrossel.classList.add('buttons_Carrossel')

            let buttons_rith = document.createElement('button')
            buttons_rith.classList.add('buttons_rith')
            buttons_rith.classList.add('button_Geral')
            buttons_rith.classList.add('material-symbols-outlined')

            buttons_rith.addEventListener('click', () => {
               carrossel_Imgs.scrollLeft += carrossel_Imgs.clientWidth
            })


            let buttons_left = document.createElement('button')
            buttons_left.classList.add('buttons_left')
            buttons_left.classList.add('button_Geral')
            buttons_left.classList.add('material-symbols-outlined')

            buttons_left.addEventListener('click', () => {
               carrossel_Imgs.scrollLeft -= carrossel_Imgs.clientWidth
            })

            let art_descricao = document.createElement('article')
            art_descricao.classList.add('art_descricao')

            let nomeIten = document.createElement('h1')
            nomeIten.classList.add('nomeIten')
            nomeIten.dataset.nome = itensVendas[i].iten

            let precoIten = document.createElement('h2')
            precoIten.classList.add('precoIten')
            precoIten.dataset.preco = itensVendas[i].preco

            let descricaoIten = document.createElement('h3')
            descricaoIten.classList.add('descricaoIten')

            for (let img = 0; img < itensVendas[i].imgs.length; img++) {
               let container_imgs = document.createElement('img')
               container_imgs.classList.add('container_imgs')
               carrossel_Imgs.appendChild(container_imgs).src = "../" + itensVendas[i].imgs[img]
               container_imgs.alt = itensVendas[i].iten
            }


            //  criar elementos para exbir o tamanho dos itens 
            let itensTamanhos = document.createElement('div')
            itensTamanhos.classList.add('itensTamanhos')
            let faceTamanho = document.createElement('div')
            faceTamanho.classList.add('face')
            let titleTamanho = document.createElement('p')

            for (let t = 0; t < itensVendas[i].tamanho.length; t++) {
               let dados_tamanhos = document.createElement('input')
               dados_tamanhos.type = 'radio'
               dados_tamanhos.name = 'tamanho'
               dados_tamanhos.id = itensVendas[i].tamanho[t]
               dados_tamanhos.value = itensVendas[i].tamanho[t]

               if (dados_tamanhos.value == itensVendas[i].tamanho[0]) {
                  dados_tamanhos.checked = true
                  tamanhoSelionado = dados_tamanhos.value
               }

               let label_tamanhos = document.createElement('label')
               label_tamanhos.setAttribute("for", itensVendas[i].tamanho[t])
               label_tamanhos.innerHTML = itensVendas[i].tamanho[t]
               label_tamanhos.classList.add('label_tamanhos')

               faceTamanho.appendChild(dados_tamanhos)
               faceTamanho.appendChild(label_tamanhos)
               dados_tamanhos.classList.add('input_None')

               // evento para selecionar o valor do input radio
               dados_tamanhos.addEventListener('change', () => {
                  if (dados_tamanhos.checked) {
                     tamanhoSelionado = dados_tamanhos.value
                  }
               })
            }

            // criar elementos para exbir as cores dos itens 
            let itensCores = document.createElement('div')
            itensCores.classList.add('itensTamanhos')
            let faceCores = document.createElement('div')
            faceCores.classList.add('face')
            let titleCores = document.createElement('p')

            for (let c = 0; c < itensVendas[i].cores.length; c++) {
               let dados_cores = document.createElement('input')
               dados_cores.type = 'radio'
               dados_cores.name = 'cores'
               dados_cores.id = itensVendas[i].cores[c]
               dados_cores.value = itensVendas[i].cores[c]
               dados_cores.classList.add('input_None')

               if (dados_cores.value == itensVendas[i].cores[0]) {
                  dados_cores.checked = true
                  coresSelecinada = dados_cores.value
               }

               let label_cores = document.createElement('label')
               label_cores.setAttribute("for", itensVendas[i].cores[c])
               label_cores.innerHTML = itensVendas[i].cores[c]
               label_cores.classList.add('label_cores')

               faceCores.appendChild(dados_cores)
               faceCores.appendChild(label_cores)

               // evento para selecionar o valor do input radio
               dados_cores.addEventListener('change', () => {
                  if (dados_cores.checked) {
                     coresSelecinada = dados_cores.value
                  }
               })

            }

            let buttons_Finais = document.createElement('div')
            buttons_Finais.classList.add('buttons_Finais')

            let finasFace = document.createElement('div')
            finasFace.classList.add('face')

            let add_favorito = document.createElement('button')
            add_favorito.classList.add('add_favorito')
            add_favorito.classList.add('material-symbols-outlined')

            // adicionar a lista de favorito
            add_favorito.addEventListener('click', () => {
               adicionarItens({ id: Number(add_Carrinho.closest('.dO_detlhes').dataset.id), dados: 'favoritos' })
            })

            let comprar_Agora = document.createElement('button')
            comprar_Agora.classList.add('comprar_Agora')
            comprar_Agora.classList.add('buttonAdds')


            comprar_Agora.addEventListener('click', () => {

               //      comprarItemAgora()
            })


            let add_Carrinho = document.createElement('button')
            add_Carrinho.classList.add('add_Carrinho')
            add_Carrinho.classList.add('buttonAdds')

            // adicionar itens ao carrinho
            add_Carrinho.addEventListener('click', () => {
               adicionarItens({ id: Number(add_Carrinho.closest('.dO_detlhes').dataset.id), dados: 'carrinho' })
            })


            if (id_detalhes_face) {
               id_detalhes_face.appendChild(dO_detlhes)
               dO_detlhes.appendChild(dt_sliders)
               dt_sliders.appendChild(carrossel_Imgs)
               dt_sliders.appendChild(buttons_Carrossel)
               buttons_Carrossel.appendChild(buttons_left).innerHTML = "arrow_back_ios"
               buttons_Carrossel.appendChild(buttons_rith).innerHTML = "arrow_forward_ios"
               dO_detlhes.appendChild(art_descricao)
               art_descricao.appendChild(nomeIten).innerHTML = itensVendas[i].iten
               art_descricao.appendChild(precoIten).innerHTML = itensVendas[i].preco + "kz"
               art_descricao.appendChild(descricaoIten).innerHTML = itensVendas[i].itenDesc
               art_descricao.appendChild(itensTamanhos)
               itensTamanhos.appendChild(titleTamanho).innerHTML = "Tamanho"
               itensTamanhos.appendChild(faceTamanho)
               art_descricao.appendChild(itensCores)
               itensCores.appendChild(titleCores).innerHTML = "Cor"
               itensCores.appendChild(faceCores)
               art_descricao.appendChild(buttons_Finais)
               buttons_Finais.appendChild(finasFace)
               finasFace.appendChild(add_favorito).textContent = 'favorite'
               finasFace.appendChild(comprar_Agora).textContent = "Comprar"
               finasFace.appendChild(add_Carrinho).textContent = "Adicionar ao carrinho"

            }
         }
      }
   }
   informacoesItem()
}


function selecionarLabel() {
   let lwSelecionar = document.querySelectorAll('.label_cores')
   let coresMaracdo = document.querySelector('input[name="cores"]:checked')

   if (lwSelecionar) {
      lwSelecionar.forEach(itemSelecionar => {

         if (itemSelecionar.innerHTML == coresMaracdo.id) {
            itemSelecionar.classList.add('selecionarActivo')
         }

         itemSelecionar.addEventListener('click', () => {
            lwSelecionar.forEach(lwRemover => {
               lwRemover.classList.remove('selecionarActivo')
            })

            itemSelecionar.classList.add('selecionarActivo')
         })
      })
   }


   let lwSelTamanho = document.querySelectorAll('.label_tamanhos')
   let tamanhoMaracdo = document.querySelector('input[name="tamanho"]:checked')


   lwSelTamanho.forEach(itemStamanho => {
      if (itemStamanho.innerHTML == tamanhoMaracdo.id) {
         itemStamanho.classList.add('selecionarActivo')
      }

      itemStamanho.addEventListener('click', () => {
         lwSelTamanho.forEach(sltRemover => {
            sltRemover.classList.remove('selecionarActivo')
         })

         itemStamanho.classList.add('selecionarActivo')
      })
   })



}
selecionarLabel()

//=======================================
// ADICIONAR ITENS A LISTA 
//======================================
function adicionarItens({ id, dados }) {

   for (let i = 0; i < itensVendas.length; i++) {
      if (id === itensVendas[i].id) {

         // =======================================
         // DECISAO ONDE DEVE SER ADICIONADO O ITEM 
         //========================================
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

            avisoGeral('add')
         }

         if (dados == 'favoritos') {
            //VERIFICAR SE EXISTE NOS FAVORITOS
            let existeItem = favoritos.find(p =>
               p.id == id && p.cor == coresSelecinada && p.tamanho == tamanhoSelionado

            )
            //SE NAO EXISTE NOS FAVORITOS ENCREMENTA A QUANTIDADE 
            if (existeItem && dados == 'favoritos') {
               existeItem.quantidade++

               avisoGeral('older')
            }
            // SE NAO EXISTE ADICIONA UM ITEM AOS FAVORITOS
            else {
               favoritos.push({ id: itensVendas[i].id, iten: itensVendas[i].iten, img: itensVendas[i].img, preco: itensVendas[i].preco, cor: coresSelecinada, descricao: itensVendas[i].itenDesc, tamanho: tamanhoSelionado, quantidade: 1, dados: dados })
               avisoGeral('new')
            }
         }
      }
   }

   // ACTULIZAR ITENS
   actualizar()
}


//==============================
// ACTUALIZAR ITENS
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

function avisoGeral(valor) {

   let sect_avisoAdicionar = document.querySelector('.sect_avisoAdicionar')
   sect_avisoAdicionar.classList.add('activo_avisoAdicionar')

   let processo = document.querySelector('.processo')
   let avisoAdicionar = document.querySelector('.avisoAdicionar')

   if (valor === 'new') {
      avisoAdicionar.textContent = 'Iten adicionado aos favoritos'
   }

   else if (valor === 'older') {
      avisoAdicionar.textContent = 'Esse item ja existe'
      processo.classList.add('processo_none')
   }

   else if (valor == 'carrinho') {
      avisoAdicionar.textContent = 'Carrinho vazio'
      processo.classList.add('processo_none')
   }

   else if (valor == 'favorito') {
      avisoAdicionar.textContent = 'Lista vazia'
      processo.classList.add('processo_none')
   }

   else if (valor == 'add') {
      avisoAdicionar.textContent = 'item adionado ao carrinho'
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
         avisoGeral('favorito')
      }
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
      console.log(itens_img_list.src)

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

/* 
let regexOU = /^\+244\s?9\d{2}\s?\d{3}\s?\d{3}$/;
let regex = /^\+2449\d{8}$/;
if (regex.test(whatsApp.value) || regexOU.test(whatsApp.value)) {
if (regex.test(numeroTelefone.value) || regexOU.test(numeroTelefone.value)) {
let regxEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if (regxEmail.test(g_mail.value)) {
aviso[2].textContent = ""
}*/
