const LEIDYTEENS_CACHE = 'leidy-cache-v1';

const urlsToCache = [
  '/front/index.html',
  '/front/produtos.html',
  '/front/cadastrar.html',
  '/front/cadastrar.html',
  '/front/carrinho.html',
  '/front/login.html',
  '/front/usuario.html',
  '/front/static/css/mainpage.css',
  '/front/static/css/structure.css',
  '/front/static/css/header.css',
  '/front/static/css/navbar.css',
  '/front/static/css/footer.css',
  '/front/static/css/cart.css',
  '/front/static/css/connection.css',
  '/front/static/css/products.css',
  '/front/static/css/swiper-bundle.min.css',
  '/front/static/js/bundle_edit.js',
  '/front/static/js/bundle_navbar.js',
  '/front/static/js/carousel.js',
  '/front/static/js/carrinho.js',
  '/front/static/js/edit.js',
  '/front/static/js/footer.js',
  '/front/static/js/login.js',
  '/front/static/js/bundle_navbar.js',
  '/front/static/js/produtos.js',
  '/front/static/js/register.js',
  '/front/static/js/requestsDelete.js',
  '/front/static/js/requestsEdit.js',
  '/front/static/js/requestsLogin.js',
  '/front/static/js/requestsRegister.js',
  '/front/static/js/setService.js',
  '/front/static/js/subheader.js',
  '/front/static/js/swiper-bundle.min.js',
  '/front/static/img/logotipo.webp',
  '/front/static/img/logotipo1.png',
  '/front/static/img/logotipo2.png',
  '/front/static/img/unknow.webp',
  '/front/static/img/banners/banner1.png',
  '/front/static/img/banners/banner2.png',
  '/front/static/img/banners/banner3.png',
  '/front/static/img/blusas/blusa lana.png',
  '/front/static/img/blusas/manga longa lana.png',
  '/front/static/img/blusas/manga longa white.png',
  '/front/static/img/blusas/tule duas pecas.png',
  '/front/static/img/calcas/calca cargo bege.png',
  '/front/static/img/calcas/calca cargo cinza.png',
  '/front/static/img/calcas/calca cargo jeans.png',
  '/front/static/img/calcas/calca cargo verde.png',
  '/front/static/img/calcas/calca rosa.png',
  '/front/static/img/conjuntos/conjunto barbie core.png',
  '/front/static/img/jaquetas/jaqueta lana brilhante.png',
  '/front/static/img/jaquetas/jaqueta lana fosca.png',
  '/front/static/img/jaquetas/jaqueta prata puffer.png',
  '/front/static/img/vestidos/vestido black princess.png',
  '/front/static/img/vestidos/vestido terracota.png',
  '/front/static/img/products/produto_conjuntoColorido1.jpeg',
  '/front/static/img/products/produto_calcaBege.jpeg'
];

const bootstrapUrls = [

//   'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
//   'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js',
//   'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
//   'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
//   'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
//   'https://code.jquery.com/jquery-3.5.1.slim.min.js',
//   'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js',
//   'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js',
//   'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(LEIDYTEENS_CACHE)
      .then(function(cache) {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache.concat(bootstrapUrls));
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(LEIDYTEENS_CACHE)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', function(event) {
  const cacheWhitelist = [LEIDYTEENS_CACHE];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});