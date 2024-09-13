const input = document.querySelector('.burger-menu__input');
const nav = document.querySelector('.nav');

input.addEventListener('change', () => {
    if (input.checked) {
        nav.style.top = '0';
    } else {
        nav.style.top = '-100%';
    }
})