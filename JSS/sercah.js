// IMPORTAR A LISTA DE PRODUOTS
import { itensVendas } from "../bancoDados.js"
import { carrinho } from "./dets.js"


// PEGAR OS DADOS DE PESQUISA APARTIR DA URL
const params = new URLSearchParams(window.location.search)
let dadosPesquisa = params.get('dadosPesquisa')


function resultadoTela(valor) {
   document.querySelector('.dw-resultado').innerHTML = ''

   if (valor.trim() != '') {
      let itensFillter = itensVendas.filter(itvs =>
         itvs.iten.includes(valor) || itvs.itenDesc.includes(valor)
      )

      // CRIAR RESULTADOS DINAMICAMENTE NA TELA
      itensFillter.forEach(itens => {

         // criar elementos HTML
         let buttonResultado = document.createElement('button')
         buttonResultado.classList.add('itens-resultado')
         buttonResultado.dataset.id = itens.id

         let imgResultado = document.createElement('img')
         imgResultado.classList.add('img-resultado')
         imgResultado.dataset.id = itens.id
         imgResultado.src = "../IMGS/../" + itens.img


         let detalhesResultado = document.createElement('div')
         detalhesResultado.classList.add('detalhes-resultado')


         let p_detalheResultado = document.createElement('p')
         p_detalheResultado.classList.add('p-detalhe-resultado')


         let nameIten = document.createElement('span')
         nameIten.classList.add('name-iten')
         nameIten.textContent = itens.iten

         let precoIten = document.createElement('span')
         precoIten.classList.add('preco-iten')
         precoIten.textContent = itens.preco + "Kz"

         let iconeResultado = document.createElement('div')

         let icone = document.createElement('span')
         icone.classList.add('material-symbols-outlined')

         iconeResultado.addEventListener('click', () => {
            iconeResultado.addEventListener('click', () => {
               adicionarItens({ id: Number(iconeResultado.closest('.itens-resultado').dataset.id), dados: 'carrinho' })
            })
         })

         // INSERIR NA PAGINA
         document.querySelector('.dw-resultado').appendChild(buttonResultado)
         buttonResultado.appendChild(imgResultado)
         buttonResultado.appendChild(detalhesResultado)
         detalhesResultado.appendChild(p_detalheResultado)
         p_detalheResultado.appendChild(nameIten)
         p_detalheResultado.appendChild(precoIten)
         detalhesResultado.appendChild(iconeResultado)
         iconeResultado.appendChild(icone).textContent = "add_shopping_cart"

         imgResultado.addEventListener('click', () => {
            enviar(Number(buttonResultado.dataset.id))
         })
      })

      if (itensFillter.length === 0) {
         resultadoNone('nofund')
      }
      else {
         resultadoNone('fund')
      }
   }
   // CASO NÃO ENCONTRE RESULTADOS
}
resultadoTela(dadosPesquisa)

// FUNÇÃO PARA ENVIAR O ID PARA OUTRA PÁGINA
function enviar(id) {
   // redirecionar para página de detalhes
   window.location.href = "CPSS/../dets.html?id=" + id
}

//===========================================
//FUNÇÃO EXIBIR MENSAGEM PESQUISA NAO ENCOTRADA
//============================================
function resultadoNone(valor) {
   let dw_sugestoes = document.querySelector('.dw-resultado')

   if (valor === 'nofund') {

      dw_sugestoes.innerHTML = ''
      dw_sugestoes.classList.add('grid_none')
      let resultado_none = document.createElement('div')
      resultado_none.classList.add('resultado_none')

      let text_none = document.createElement('p')
      text_none.textContent = 'Não foi possível encotrar o item!'

      dw_sugestoes.appendChild(resultado_none)
      resultado_none.appendChild(text_none)
   }

   else if (valor === 'fund') {
      dw_sugestoes.classList.remove('grid_none')
   }
}

//==================
// VARIAVEIS GLOBAIS
//==================
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


// BOTÃO VOLTAR PARA HOME
let button_Back = document.querySelector('.button_Back')
if (button_Back) {
   button_Back.addEventListener('click', () => {
      window.location.href = '../index.html'
   })
}

// ================================
//  ABRIR A CAIXA DE PESQUISA E SUGESTÕES
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

// função para normalizar texto (remover acentos e deixar minúsculo)
function
   normalizar(texto) {
   return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()

}

// INPUT DE PESQUISA (SUGESTÕES EM TEMPO REAL)
document.getElementById('input-pesquisar').addEventListener('input', () => {
   let inputPesquisar = document.getElementById('input-pesquisar').value

   // limpar sugestões anteriores
   let sugestoes = []
   document.querySelector('.dw-sugestoes').innerHTML = ""


   if (!inputPesquisar == "") {

      // só pesquisa se tiver texto
      if (!inputPesquisar.trim() == "") {
         for (let i = 0; i < itensVendas.length; i++) {

            // verificar se nome do item contém o texto pesquisado
            if (normalizar(itensVendas[i].iten).includes(normalizar(inputPesquisar))) {

               // evitar duplicados
               if (!sugestoes.some(obj => obj.iten === itensVendas[i].iten)) {
                  sugestoes.push(itensVendas[i])
               }
            }
         }
      }
   }

   // mostrar sugestões na tela
   for (let i = 0; i < sugestoes.length; i++) {
      let sugstButton = document.createElement('button')
      document.querySelector('.dw-sugestoes').appendChild(sugstButton)
      sugstButton.textContent = sugestoes[i].iten
      sugstButton.addEventListener('click', () => {

         // ao clicar numa sugestão
         resultadoTela(sugstButton.textContent)
         rmSugestoes()
      })
   }
})


// PEGAR O INPUT DE PESQUISA
const inputpesquisar_Enter = document.getElementById('input-pesquisar')

// ESCUTAR QUANDO UMA TECLA FOR PRESSIONADA
inputpesquisar_Enter.addEventListener('keydown', (event) => {

   // VERIFICAR SE A TECLA PRESSIONADA FOI ENTER
   if (event.key === "Enter") {
      // VERIFICAR SE O INPUT NÃO ESTÁ VAZIO
      if (inputpesquisar_Enter.value !== '') {

         // EXECUTAR A AÇÃO
         resultadoTela(normalizar(inputpesquisar_Enter.value))
         rmSugestoes()
         inputpesquisar_Enter.value = ''
      }
   }
})


// FECHAR SUGESTÕES
function rmSugestoes() {
   document.querySelector('.sugestoes').classList.remove('sugestoes-activo')
}

// ================================
// VER DETALHES DOS ITENS QUE ESTÃO NO CARRINHO
// ================================
let art_container_ver = document.querySelector('.art_container_ver')
function ver_detals_carrinho(id, nome, cor, tamanho) {
   art_container_ver.innerHTML = ''
   let obs_carrinho = carrinho.filter(p =>
      p.id == id && p.iten == nome && p.cor == cor && p.tamanho == tamanho
   )

   obs_carrinho.forEach(obs => {
      let obsImg = document.createElement('img')
      obsImg.src = "../IMGS/../" + obs.img
      obsImg.classList.add('obsImg')

      let dw_obs_container = document.createElement('div')
      dw_obs_container.classList.add('dw_obs_container')

      let obsIten = document.createElement('h1')
      obsIten.textContent = obs.iten + 'ok'

      let obs_preco_moeda = document.createElement('p')
      obs_preco_moeda.classList.add('obs_preco_moeda')

      let obsPreco = document.createElement('h2')
      obsPreco.classList.add('obsPreco')
      obsPreco.textContent = obs.preco * obs.quantidade

      let obsMoeda = document.createElement('span')
      obsMoeda.textContent = 'Kz'

      let obsDescricao = document.createElement('p')
      obsDescricao.textContent = obs.descricao

      let obsCor = document.createElement('span')
      obsCor.textContent = 'cor: ' + obs.cor

      let obsTamanho = document.createElement('span')
      obsTamanho.textContent = 'tamanho: ' + obs.tamanho


      art_container_ver.appendChild(obsImg)
      art_container_ver.appendChild(dw_obs_container)
      dw_obs_container.appendChild(obsIten)

      dw_obs_container.appendChild(obs_preco_moeda)
      obs_preco_moeda.appendChild(obsPreco)
      obs_preco_moeda.appendChild(obsMoeda)

      dw_obs_container.appendChild(obsDescricao)
      dw_obs_container.appendChild(obsCor)
      dw_obs_container.appendChild(obsTamanho)
   })
}


// ============================
// MANIPULAR LISTA DE CARRINHO
//==============================
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


//==============================
// ACTUALIZAR ITENS
//==============================
function actualizar() {
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
