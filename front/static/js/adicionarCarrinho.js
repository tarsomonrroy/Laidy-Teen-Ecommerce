function adicionarAoCarrinho(nome, descricao, imagem, preco) {
    const produto = { nome, descricao, imagem, preco, quantidade: 1, tamanho: 'M' };
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let msg = 'Produto adicionado ao carrinho!'
    const produtoExistente = carrinho.find(item => item.nome === produto.nome);
    if (produtoExistente) {
        produtoExistente.quantidade += 1;
        msg = 'Produto somado no carrinho!'
    } else carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    Swal.fire({
        "icon" : "success",
        "title" : "Adicionado",
        "text" : msg,
        "heightAuto" : false
    });
}