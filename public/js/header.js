let menuButton = document.querySelector('.header_menuButton');
let menu = document.querySelector('.main-nav-menu');
let menuCloseButton = document.querySelector('.header_menuClose');

menuButton.addEventListener('click', () => {
    menu.classList.add('active');
})

menuCloseButton.addEventListener('click', () => {
    menu.classList.remove('active');
})