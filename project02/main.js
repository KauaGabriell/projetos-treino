const vendas = [
    { produto: 'Notebook Gamer', valor: 4500, categoria: 'Eletrônicos' },
    { produto: 'Mouse sem Fio', valor: 150, categoria: 'Acessórios' },
    { produto: 'Teclado Mecânico', valor: 350, categoria: 'Acessórios' },
    { produto: 'Monitor 4K', valor: 2800, categoria: 'Eletrônicos' },
    { produto: 'Cadeira de Escritório', valor: 950, categoria: 'Móveis' },
    { produto: 'Webcam HD', valor: 80, categoria: 'Acessórios' }
  ];

  

  function analisarVendas(listaDeVendas){
    const faturamentoTotal = listaDeVendas.reduce(function(acumulador, produto){
        acumulador += produto.valor;
        return acumulador;
      }, 0);

    const vendasPorCategoria = listaDeVendas.reduce(function(acumulador, produto){
        if(!acumulador[produto.categoria]){
            acumulador[produto.categoria] = produto.valor;
        }else{
            acumulador[produto.categoria] += produto.valor;
        }
        return acumulador
    }, {})

    const quantidade = listaDeVendas.length;

    return {
        faturamento: faturamentoTotal,
        vendasCategoria: vendasPorCategoria,
        quantidadeDeVendas: quantidade,
    }
  }

  console.log(analisarVendas(vendas));