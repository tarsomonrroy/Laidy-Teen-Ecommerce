function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoItens = document.getElementById('carrinhoItens');
    carrinhoItens.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        const emptyCartCard = document.createElement('div');
        emptyCartCard.classList.add('col-auto', 'empty-cart');
        emptyCartCard.innerHTML = `
            <img src="./static/img/empty.png" alt="Carrinho Vazio">
            <p>Seu carrinho está vazio.</p>
        `;
        carrinhoItens.appendChild(emptyCartCard);
    } else {
        carrinho.forEach((produto, index) => {
            if (!produto.tamanho) {
                produto.tamanho = 'M';
                alterarProduto(index, 'tamanho', 'M');
            }

            const item = document.createElement('div');
            item.classList.add('card', 'mb-3');
            item.innerHTML = `
                <div class="row no-gutters">
                    <div class="col-md-2 img-prod">
                        <img src="${produto.imagem}" class="card-img" alt="${produto.nome}">
                    </div>
                    <div class="col-md-8">
                        <h5 class="card-title">${produto.nome}</h5>
                        <p class="card-text">Custo: ${produto.descricao}</p>
                        <div class="card-body">
                            <div class="form-group size-container">
                                <label for="tamanho${index}">Tamanho</label>
                                <select id="tamanho${index}" class="form-control" onchange="alterarProduto(${index}, 'tamanho', this.value)">
                                    <option value="P" ${produto.tamanho === 'P' ? 'selected' : ''}>P</option>
                                    <option value="M" ${produto.tamanho === 'M' ? 'selected' : ''}>M</option>
                                    <option value="G" ${produto.tamanho === 'G' ? 'selected' : ''}>G</option>
                                </select>
                            </div>
                            <div class="form-group quantity d-flex justify-content-center align-items-center">
                                <label class="quantity-lab">Quantidade:</label>
                                <button class="quantity-btn" onclick="alterarQuantidade(${index}, -1)">-</button>
                                <span class="quantidade-num" id="quantidade${index}">${produto.quantidade}</span>
                                <button class="quantity-btn" onclick="alterarQuantidade(${index}, 1)">+</button>
                            </div>
                            <button class="btn-remover" onclick="confirmarRemocaoDoCarrinho(${index})">
                                <i class="fas fa-trash-alt"></i> Remover
                            </button>
                        </div>
                    </div>
                </div>
            `;
            carrinhoItens.appendChild(item);
            total += produto.preco * produto.quantidade;
        });
    }

    document.getElementById('precoTotal').innerText = total.toFixed(2);
}

function alterarProduto(index, atributo, valor) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho[index][atributo] = valor;
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

function alterarQuantidade(index, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho[index].quantidade += quantidade;
    if (carrinho[index].quantidade < 1) carrinho[index].quantidade = 1;
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

function confirmarRemocaoDoCarrinho(index) {
    Swal.fire({
        title: "Remover?",
        text: "Deseja remover do carrinho?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, apagar!",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            removerProduto(index);
        } else {
            return;
        }
    });

}
    
function removerProduto(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

function verMaisProdutos() {
    window.location.href = 'produtos.html';
}



document.addEventListener('DOMContentLoaded', carregarCarrinho);