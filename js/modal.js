const body = document.querySelector('body');
const modalView = document.querySelector('.modal');
const modal__close = document.querySelector('.modal__close');
const modalButtonAddComment = document.querySelectorAll('.content__button');

//add comment
modalButtonAddComment.forEach((buttElement, index) => buttElement.addEventListener('click', () => {
    modalView.style.display = 'block'
    body.classList.add('no-scroll')
}))

//close modal view
if (modal__close) {
    modal__close.addEventListener('click', () => {
        modalView.style.display = 'none'
        body.classList.remove('no-scroll')
    })
}