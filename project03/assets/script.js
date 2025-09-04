let todosOsCartoes = [];

class Cartao {
  constructor(titulo, descricao) {
    (this.titulo = titulo), (this.descricao = descricao);
    this.id = Date.now();
    this.coluna = 'a-fazer';
  }
}

/**Elements */
const form = document.querySelector('#form-novo-cartao');
const inputTitulo = document.querySelector('#cartao-titulo');
const inputDescricao = document.querySelector('#cartao-descricao');
const quadroKanban = document.querySelector('.kanban-board');

const cardsContainerAFazer = document.querySelector('#coluna-a-fazer .kanban-cards');
const contadorAFazer = document.querySelector('#coluna-a-fazer .contador');

const cardsContainerEmAndamento = document.querySelector('#coluna-em-andamento .kanban-cards');
const contadorEmAndamento = document.querySelector('#coluna-em-andamento .contador');

const cardsContainerConcluido = document.querySelector('#coluna-concluido .kanban-cards');
const contadorConcluido = document.querySelector('#coluna-concluido .contador');

/**Evento de Enviar Formulário */
form.addEventListener('submit', (event) => {
  //Prevenindo evento padrão
  event.preventDefault();
  const tituloCartao = inputTitulo.value;
  const descricaoCartao = inputDescricao.value;

  //Criando Objeto utilizando a Classe
  const cartao = new Cartao(tituloCartao, descricaoCartao);
   
  //Adicionando no board
  todosOsCartoes.push(cartao);

  //Limpando os inputs
  inputTitulo.value = '';
  inputDescricao.value = '';

  renderizarQuadro(todosOsCartoes);
});

/**Evento de click nos cartões */
quadroKanban.addEventListener('click', function(event) {
  const el = event.target;
  const cartaoClicado = el.closest('.kanban-card');

  if (!cartaoClicado) return;

  const acao = el.dataset.action;
  const cartaoId = Number(cartaoClicado.dataset.id);
  
  // Encontramos o cartão que precisa ser modificado UMA VEZ.
  const cartaoAlvo = todosOsCartoes.find(cartao => cartao.id === cartaoId);
  if (!cartaoAlvo) return; // Se não encontrar o cartão, não faz nada.

  // Agora, decidimos qual ação tomar.
  if (acao === 'deletar') {
      todosOsCartoes = todosOsCartoes.filter(cartao => cartao.id !== cartaoId);
  
  } else if (acao === 'mover-proximo') {
      if (cartaoAlvo.coluna === 'a-fazer') {
          cartaoAlvo.coluna = 'em-andamento';
      } else if (cartaoAlvo.coluna === 'em-andamento') {
          cartaoAlvo.coluna = 'concluido';
      }
  
  } else if (acao === 'mover-anterior') {
      if (cartaoAlvo.coluna === 'concluido') {
          cartaoAlvo.coluna = 'em-andamento';
      } else if (cartaoAlvo.coluna === 'em-andamento') {
          cartaoAlvo.coluna = 'a-fazer';
      }
  }

  renderizarQuadro(todosOsCartoes);
});

/**
 * FUNÇÕES 
 * */

/****Função de Renderizar a Tela */
function renderizarQuadro(listaDeCartoes = []) {
  // A função não precisa mais de parâmetro, ela sempre usará a "fonte da verdade"

    // --- Coluna "A Fazer" ---
    const cartoesAFazer = todosOsCartoes.filter(c => c.coluna === 'a-fazer');
    cardsContainerAFazer.innerHTML = cartoesAFazer.map(criaCartaoHtml).join('');
    contadorAFazer.innerText = `(${cartoesAFazer.length})`;

    // --- Coluna "Em Andamento" ---
    const cartoesEmAndamento = todosOsCartoes.filter(c => c.coluna === 'em-andamento');
    cardsContainerEmAndamento.innerHTML = cartoesEmAndamento.map(criaCartaoHtml).join('');
    contadorEmAndamento.innerText = `(${cartoesEmAndamento.length})`;

    // --- Coluna "Concluído" ---
    const cartoesConcluidos = todosOsCartoes.filter(c => c.coluna === 'concluido');
    cardsContainerConcluido.innerHTML = cartoesConcluidos.map(criaCartaoHtml).join('');
    contadorConcluido.innerText = `(${cartoesConcluidos.length})`;
  
}

/****Função para Criar HTML do cartão */
function criaCartaoHtml(cartao){
  return `<div class="kanban-card" data-id="${cartao.id}">
    <h3>${cartao.titulo}</h3>
    <p>${cartao.descricao}</p>
    <div class="acoes">
        <button class="btn-mover-anterior" data-action="mover-anterior">←</button>
        <button class="btn-mover-proximo" data-action="mover-proximo">→</button>
        <button class="btn-deletar" data-action="deletar">X</button>
    </div>
</div>`;
}

