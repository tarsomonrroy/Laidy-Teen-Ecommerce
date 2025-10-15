var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    effect: "fade",
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    }
})

var swiper_prod = new Swiper(".mySwiper-prod", {
    slidesPerView: 3,
    spaceBetween: 30,
    simulateTouch: false,
    loop: true,
    autoplay: {
        delay: 3000
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
})

// var items = document.querySelectorAll('.carousel .carousel-item');
// items.forEach((e)=>{
//     const slide = 3;
//     let next = e.nextElementSibling;
//     for(var i = 0; i < slide; i++) {
//         if(!next) {
//             next = items[0]
//         }
//         let cloneChild = next.cloneNode(true)
//         e.appendChild(cloneChild.children[0])
//         next = next.nextElementSibling
//     }
// })