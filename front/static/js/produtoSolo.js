document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const produtoNome = urlParams.get('nome');

    const produto = produtos.find(p => p.nome === produtoNome);

    if (produto) {
        let prod = 20;
        document.getElementById('product-image').src = produto.imagem;
        document.getElementById('product-name').textContent = produto.nome;
        document.getElementById('product-description').textContent = produto.descript;
        document.getElementById('product-price').textContent = 'R$ ' + prod.toString() + ',00';
        // Função para adicionar ao carrinho
        window.adicionarAoCarrinho = function () {
            const produtoCarrinho = { nome: produto.nome, descricao: produto.preco, imagem: produto.imagem, preco: produto.valor, quantidade: 1, tamanho: 'M' };
            let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            carrinho.push(produtoCarrinho);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            //swal
            Swal.fire({
                heightAuto: false,
                "icon": "success",
                "title": "adicionado",
                "text": "Produto adicionado ao carrinho!"
            });
        };
    } else {
        document.getElementById('product-image').src = './static/img/unknow.webp';
        document.getElementById('product-name').textContent = 'desconhecido';
        document.getElementById('product-description').textContent = 'missing text';
        document.getElementById('product-price').textContent = 'R$00,00';
        //swal
        Swal.fire({
            heightAuto: false,
            "icon": "error",
            "title": "Erro",
            "text": "Produto não encontrado."
        });
    }
});

const produtos = [{
    "valor":"R$65,00",
    "nome": "Calça cargo cinza",
    "valor": 65.00,
    "imagem": "./static/img/calcas/calca cargo cinza.png",
    "descript": "Sou uma calça cargo com modelagem wide, o que significa que tenho bolsos nas laterais e sou larguinha nas pernas. Sou a calça do momento, deixando qualquer look básico com uma pegada fashionista. Me escolhe, e tenho certeza de que não vamos mais nos desgrudar."
  },
  {
    "valor": "R$60.00",
    "nome": "Calça cargo jeans",
    "valor": 60.00,
    "imagem": "./static/img/calcas/calca cargo jeans.png",
    "descript": "Sou uma calça cargo com modelagem wide, o que significa que tenho bolsos nas laterais e sou larguinha nas pernas. Sou a calça do momento, deixando qualquer look básico com uma pegada fashionista. Me escolhe, e tenho certeza de que não vamos mais nos desgrudar."
  },
  {
    "valor": "R$60,00",
    "nome": "Calça cargo verde militar",
    "valor": 60.00,
    "imagem": "./static/img/calcas/calca cargo verde.png",
    "descript": "Sou uma calça cargo com modelagem wide, o que significa que tenho bolsos nas laterais e sou larguinha nas pernas. Sou a calça do momento, deixando qualquer look básico com uma pegada fashionista. Me escolhe, e tenho certeza de que não vamos mais nos desgrudar."
  },
  {
    "valor": "R$65,00",
    "nome": "Calça cargo bege",
    "valor": 60.00,
    "imagem": "./static/img/calcas/calca cargo bege.png",
    "descript": "Sou uma calça cargo com modelagem wide, o que significa que tenho bolsos nas laterais e sou larguinha nas pernas. Sou a calça do momento, deixando qualquer look básico com uma pegada fashionista. Me escolhe, e tenho certeza de que não vamos mais nos desgrudar."
  },
  {
    "valor": "R$35,00",
    "nome": "Calça rosa pantalona",
    "valor": 35.00,
    "imagem": "./static/img/calcas/calca rosa.png",
    "descript": "Wide leg confortável, fresquinha e estilosa, pode ser usada tanto para compor looks mais sociais quanto despojado. Esse com certeza é a calça que estava faltando no seu guarda-roupas."
  },
  {
    "valor": "R$35,00",
    "nome": "Baby look lana",
    "valor": 35.00,
    "imagem": "./static/img/blusas/blusa lana.png",
    "descript": "A Baby Look Lana Del Rey foi criada para meninas autênticas e ousadas expressarem o seu estilo. Confeccionada em malha Viscolycra, possui elasticidade e estampa Clássica da Lana Del Rey"
  },
  {
    "valor": "R$27,00",
    "nome": "Manga longa lana",
    "valor": 27.00,
    "imagem": "./static/img/blusas/manga longa lana.png",
    "descript": "Básica e estilosa, é perfeita para qualquer ocasião. Feita com malha de alta qualidade, oferece conforto e praticidade, possui dedeira mantendo suas mãos quentinhas nos dias frios."
  },
  {
    "valor": "R$45,00",
    "nome": "Manga longa branca",
    "valor": 45.00,
    "imagem": "./static/img/blusas/manga longa white.png",
    "descript": "Básica e estilosa, é perfeita para qualquer ocasião. Feita com malha de alta qualidade, oferece conforto e praticidade, possui dedeira mantendo suas mãos quentinhas nos dias frios."
  },
  {
    "valor": "R$50,00",
    "nome": "Tule duas peças",
    "valor": 50.00,
    "imagem": "./static/img/blusas/tule duas pecas.png",
    "descript": "Inclui uma blusa de manga longa transparente e um top faixa para usar por baixo. Feita com malha macia e confortável, garante estilo e conforto."
  },
  {
    "valor": "R$89,00",
    "nome": "Jaqueta lana brilhante",
    "valor": 89.00,
    "imagem": "./static/img/jaquetas/jaqueta lana brilhante.png",
    "descript": "A Jaqueta Lana foi criada para meninas autênticas e ousadas expressarem o seu estilo. Possui forro, tecido Courino fosco com um pouco de elasticidade e zíper com pingente de estrela e estrela prata nas costas."
  },
  {
    "valor": "R$89,00",
    "nome": "Jaqueta lana fosca",
    "valor": 89.00,
    "imagem": "./static/img/jaquetas/jaqueta lana fosca.png",
    "descript": "A Jaqueta Lana foi criada para meninas autênticas e ousadas expressarem o seu estilo. Possui forro, tecido Courino fosco com um pouco de elasticidade e zíper com pingente de estrela e estrela prata nas costas."
  },
  {
    "valor": "R$99,00",
    "nome": "Jaqueta prata puffer",
    "valor": 99.00,
    "imagem": "./static/img/jaquetas/jaqueta prata puffer.png",
    "descript": "A Jaqueta Lana foi criada para meninas autênticas e ousadas expressarem o seu estilo. Possui forro, tecido Courino fosco com um pouco de elasticidade e zíper com pingente de estrela e estrela prata nas costas."
  },
  {
    "valor": "R$55,00",
    "nome": "Vestido back princess",
    "valor": 55.00,
    "imagem": "./static/img/vestidos/vestido black princess.png",
    "descript": "Comprimento MIDI que está em alta"
  },
  {
    "valor": "R$50,00",
    "nome": "Vestido terracota",
    "valor": 50.00,
    "imagem": "./static/img/vestidos/vestido terracota.png",
    "descript": "Sou um vestido em malha canelada e possuo elasticidade, além de cordinhas nas laterais para ajustar o comprimento. Sou aquele vestidinho básico e estiloso, super coringa que você está procurando. Me escolhe e vamos arrasar por aí!"
  },
  {
    "valor": "R$45,00",
    "nome": "Conjunto barbie core",
    "valor": 45.00,
    "imagem": "./static/img/conjuntos/conjunto barbie core.png",
    "descript": "O tecido da saia é o crepe, ele possui muita elasticidade. Tem um sortinho por baixo da saia pra te deixar confortável. O cropped é no tecido Suplex, tecido com elasticidade"
  }
];