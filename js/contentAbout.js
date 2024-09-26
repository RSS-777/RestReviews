const title = document.querySelector('.header__title')
const aboutText = document.querySelector('.about__text');

const renderPageAbout = async () => {
 const response = await fetch('/page/about');
 const {data} = await response.json()

 if(data) {
    title.textContent = data[0].title
    aboutText.textContent = data[0].text
 }
}
renderPageAbout ()