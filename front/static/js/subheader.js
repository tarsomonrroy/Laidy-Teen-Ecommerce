function carregaSubHeader() {
    const div = document.createElement('div');
    
    div.innerHTML = `
        <ul>
            <li><a href="/front/produtos.html?categoria=calcas">Calças</a></li>
            <li><a href="/front/produtos.html?categoria=blusas">Blusas</a></li>
            <li><a href="/front/produtos.html?categoria=jaquetas">Jaquetas</a></li>
            <li><a href="/front/produtos.html?categoria=vestidos">Vestidos</a></li>
            <li><a href="/front/produtos.html?categoria=conjuntos">Conjuntos</a></li>
            <li><a href="/front/produtos.html">Todos os Produtos</a></li>
        </ul>
    `;

    const sub = document.getElementById('subheader');
    sub.appendChild(div);
}

carregaSubHeader();


{/* <li class="nav-item">
    <a class="nav-link" href="/front/produtos.html" onclick="carregarProdutos('calcas')">Calças</a>
</li>
<li class="nav-item">
    <a class="nav-link" href="/front/produtos.html" onclick="carregarProdutos('blusas')">Blusas</a>
</li>
<li class="nav-item">
    <a class="nav-link" href="/front/produtos.html" onclick="carregarProdutos('jaquetas')">Jaquetas</a>
</li>
<li class="nav-item">
    <a class="nav-link" href="/front/produtos.html" onclick="carregarProdutos('vestidos')">Vestidos</a>
</li>
<li class="nav-item">
    <a class="nav-link" href="/front/produtos.html" onclick="carregarProdutos('conjuntos')">Conjuntos</a>
</li>
<li class="nav-item">
    <a class="nav-link active" href="/front/produtos.html" onclick="carregarProdutos('todos')">Todos os Produtos</a>
</li> */}