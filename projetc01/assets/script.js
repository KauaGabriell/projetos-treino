const produtos = [
    { id: 1, nome: 'Notebook Gamer', preco: 4500, categoria: 'Eletrônicos', emEstoque: true, tags: ['gamer', 'promoção', 'computador'] },
    { id: 2, nome: 'Mouse sem Fio', preco: 150, categoria: 'Acessórios', emEstoque: true, tags: ['periférico', 'sem fio'] },
    { id: 3, nome: 'Teclado Mecânico', preco: 350, categoria: 'Acessórios', emEstoque: false, tags: ['mecânico', 'gamer', 'periférico'] },
    { id: 4, nome: 'Monitor 4K', preco: 2800, categoria: 'Eletrônicos', emEstoque: true, tags: ['tela', '4k', 'gamer'] },
    { id: 5, nome: 'Cadeira de Escritório', preco: 950, categoria: 'Móveis', emEstoque: true, tags: ['conforto', 'ergonômica'] },
    { id: 6, nome: 'Fone de Ouvido Bluetooth', preco: 420, categoria: 'Acessórios', emEstoque: false, tags: ['áudio', 'sem fio', 'promoção'] },
    { id: 7, nome: 'Webcam HD', preco: 80, categoria: 'Acessórios', emEstoque: true, tags: ['vídeo', 'streaming'] }
  ];
  const divProdutos = document.querySelector('#lista-produtos-container');
  const listaProdutos = document.querySelector('#lista-produtos');
  const divFiltros = document.querySelector('#filtros');

  function renderizarProdutos(listaDeProdutos){
    const produtosHtml = listaDeProdutos.map(function(obj){
        const statusEstoque = obj.emEstoque ? 'Em estoque🟩' : 'Sem Estoque❌'

        return `
        <li>
            <span>${obj.nome}</span>
            <span>${obj.preco}</span>
            <span>${obj.categoria}</span>
            <span>${statusEstoque}</span>
        </li>
        `;
    })
    listaProdutos.innerHTML = produtosHtml.join('');
  }

  /**Criando Array com as Categorias para fazer os botões dinâmicos */
  const todasAsCategorias = produtos.map(produto => produto.categoria);
  const categoriasUnicas = [...new Set(todasAsCategorias)];
  categoriasUnicas.unshift('Todos');


  /**Função para Renderizar Filtros */
  function renderizarFiltros(listaCategorias){
    const filtros = listaCategorias.map(function(categoria){
        return `<button>${categoria}</button>`;
    })
    divFiltros.innerHTML = filtros.join('');
    
  }


/**Evento de Filtragem */
divFiltros.addEventListener('click', function(e){
    const el = e.target;
    if(el.tagName === 'BUTTON'){
       if(el.innerHTML === 'Todos'){
        renderizarProdutos(produtos);
       }else{
        const filtrados = produtos.filter(produto => produto.categoria === el.innerHTML);
        renderizarProdutos(filtrados);
       }
    }
})
renderizarProdutos(produtos);
renderizarFiltros(categoriasUnicas);
