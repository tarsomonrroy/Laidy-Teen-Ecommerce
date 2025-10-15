function carregaNav() {
    let login = localStorage.getItem('logado');

    const token = localStorage.getItem('token');

    console.log(token)
    let username = '';

    if (token) {
        const decodedToken = jwt_decode(token); // Corrected function call
        username = decodedToken.fullName; // Assigning the decoded username
    }

    let linkCadastrar = document.createElement('a');
    let linkLogar = document.createElement('a');
    let linkPerfil = document.createElement('a');

    let currentPage = document.body.getAttribute("datapage");

    if (login && currentPage !== "profile") {
        linkPerfil.className = "nav-link";
        linkPerfil.id = "perfil";
        linkPerfil.href = "/front/usuario.html";
        linkPerfil.textContent = "Perfil";

    } else if (currentPage === "login") {
        linkCadastrar.className = "nav-link";
        linkCadastrar.id = "cadastro";
        linkCadastrar.href = "/front/cadastrar.html";
        linkCadastrar.textContent = 'Cadastro';

    } else if (currentPage === "register") {
        linkLogar.className = "nav-link";
        linkLogar.id = "login";
        linkLogar.href = "/front/login.html";
        linkLogar.textContent = 'Login';

    } else if (!login) {
        linkCadastrar.className = "nav-link";
        linkCadastrar.id = "cadastro";
        linkCadastrar.href = "/front/cadastrar.html";
        linkCadastrar.textContent = 'Cadastro';

        linkLogar.className = "nav-link";
        linkLogar.id = "login";
        linkLogar.href = "/front/login.html";
        linkLogar.textContent = 'Login';
    }

    const div = document.createElement('div');

    div.innerHTML = `
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="navbar-container container">
                <a class="logo-link" href="/">
                    <img src="./static/img/logotipo1.png" alt="Logo" class="logo-head">
                </a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent"
                    aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarContent">
                    <form class="form-inline">
                        <input class="form-control mr-sm-2" id="search-input" type="search" placeholder="Pesquisar" aria-label="Search">
                        <a href="/" class="search-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                        </a>
                    </form>

                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item" id="linkLogin"></li>
                        <li class="nav-item" id="linkCadastrar"></li>
                        <li class="nav-item dropdown" id="linkPerfil"></li>
                        <li class="nav-item">
                            <a href="/front/carrinho.html" class="bag-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-handbag" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2m3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6z"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    const navbar = document.getElementById('navbar');
    navbar.appendChild(div);

    const linkCadastrarLi = document.getElementById('linkCadastrar');
    linkCadastrarLi.appendChild(linkCadastrar);

    const linkLogarLi = document.getElementById('linkLogin');
    linkLogarLi.appendChild(linkLogar);

    const linkPerfilLi = document.getElementById('linkPerfil');

    if (login && currentPage !== "profile") {
        linkPerfilLi.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" id="dropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="user-name">${username}</span>    
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="profile-icon bi-person-square" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                </svg>
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a class="dropdown-item" href="/front/usuario.html">Meu Perfil</a>
                <a class="dropdown-item" href="#" onclick = "sair()" id = "btnSair">Sair</a>
            </div>
        `;
    }
}

function sair() {
    localStorage.clear();
    location.reload();
}

carregaNav();






{/* 
<ul class="navbar-nav ml-auto">
    <li class="nav-item" id="linkLogin"></li>
    <li class="nav-item" id="linkCadastrar"></li>
    <li class="nav-item dropdown" id="linkPerfil">
        <a class="nav-link dropdown-toggle" href="#" id="dropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="user-name">${localStorage.getItem('fullName')}</span>    
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="profile-icon bi-person-square" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
            </svg>
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" href="/front/usuario.html">Meu Perfil</a>
            <a class="dropdown-item" href="#" onclick = "sair()" id = "btnSair">Sair</a>
        </div>
    </li>

    <li class="nav-item">
        <a href="/" class="bag-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-handbag" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2m3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6z"/>
            </svg>
        </a>
    </li>
</ul> 
*/}