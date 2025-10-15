
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');

    const vazio = document.getElementById('invisible');
    const products = document.querySelectorAll('.aproduct');
    const subtitle = document.getElementById('products-subtitles');

    const categoryTitles = {
        'calcas': 'Calças',
        'blusas': 'Blusas',
        'jaquetas': 'Jaquetas',
        'vestidos': 'Vestidos',
        'conjuntos': 'Conjuntos'
    };

    if(categoria && categoryTitles[categoria]) {
        subtitle.textContent = categoryTitles[categoria];
        products.forEach(product => {
            if(product.dataset.category === categoria) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });

    } else {
        subtitle.textContent = 'Todos os Produtos';
        products.forEach(product => {
            product.style.display = 'block';
        });
    }

    vazio.style.display = 'none';
});

// const produtos = [
//     { valor: 60.00, nome: 'Calça cargo bege', preco: 'R$60,00', imagem: './static/img/calcas/calca cargo bege.png', descript: '' },
//     { valor: 65.00, nome: 'Calça cargo cinza', preco: 'R$65,00', imagem: './static/img/calcas/calca cargo cinza.png', descript: '' },
//     { valor: 60.00, nome: 'Calça cargo jeans', preco: 'R$60,00', imagem: './static/img/calcas/calca cargo jeans.png', descript: '' },
//     { valor: 60.00, nome: 'Calça cargo verde militar', preco: 'R$60,00', imagem: './static/img/calcas/calca cargo verde.png', descript: '' },
//     { valor: 35.00, nome: 'Calça rosa pantalona', preco: 'R$35,00', imagem: './static/img/calcas/calca rosa.png', descript: '' },

//     { valor: 35.00, nome: 'Baby look lana', preco: 'R$35,00', imagem: './static/img/blusas/blusa lana.png', descript: '' },
//     { valor: 27.00, nome: 'Manga longa lana', preco: 'R$27,00', imagem: './static/img/blusas/manga longa lana.png', descript: '' },
//     { valor: 45.00, nome: 'Manga longa branca', preco: 'R$45,00', imagem: './static/img/blusas/manga longa white.png', descript: '' },
//     { valor: 50.00, nome: 'Tule duas peças', preco: 'R$50,00', imagem: './static/img/blusas/tule duas pecas.png', descript: '' },

//     { valor: 89.00, nome: 'Jaqueta lana brilhante', preco: 'R$89,00', imagem: './static/img/jaquetas/jaqueta lana brilhante.png', descript: '' },
//     { valor: 89.00, nome: 'Jaqueta lana fosca', preco: 'R$89,00', imagem: './static/img/jaquetas/jaqueta lana fosca.png', descript: '' },
//     { valor: 99.00, nome: 'Jaqueta prata puffer', preco: 'R$99,00', imagem: './static/img/jaquetas/jaqueta prata puffer.png', descript: '' },

//     { valor: 55.00, nome: 'Vestido back princess', preco: 'R$55,00', imagem: './static/img/vestidos/vestido black princess.png', descript: '' },
//     { valor: 50.00, nome: 'Vestido terracota', preco: 'R$50,00', imagem: './static/img/vestidos/vestido terracota.png', descript: '' },

//     { valor: 45.00, nome: 'Conjunto barbie core', preco: 'R$45,00', imagem: './static/img/conjuntos/conjunto barbie core.png', descript: '' }
// ];   