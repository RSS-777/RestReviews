const liElement = document.querySelector('.authentication__item')
const authButton = document.querySelector('.authentication__button-login');

const formLogin = document.createElement('form');
const blockEmail = document.createElement('div');
const blockPassword = document.createElement('div');
const labelEmail = document.createElement('label')
const labelPassword = document.createElement('label')
const inputEmail = document.createElement('input')
const inputPassword = document.createElement('input')
const buttonSubmit = document.createElement('button')
const infoLogin = document.createElement('p')

formLogin.classList.add('formLogin')
formLogin.classList.add('closeFormLogin')
blockEmail.classList.add('blockEmail')
blockPassword.classList.add('blockPassword')
labelEmail.classList.add('labelEmail')
labelPassword.classList.add('labelPassword')
inputEmail.classList.add('inputEmail')
inputPassword.classList.add('inputPassword')
buttonSubmit.classList.add('buttonSubmit')
infoLogin.classList.add('infoLogin')

labelEmail.textContent = 'Email:'
inputEmail.type = 'email';
labelPassword.textContent = 'Password:';
inputPassword.type = 'password'
buttonSubmit.textContent = 'Вхід'

liElement.appendChild(formLogin)

formLogin.appendChild(blockEmail)
blockEmail.appendChild(labelEmail)
blockEmail.appendChild(inputEmail)

formLogin.appendChild(blockPassword)
blockPassword.appendChild(labelPassword)
blockPassword.appendChild(inputPassword)

formLogin.appendChild(buttonSubmit)
formLogin.appendChild(infoLogin)

//відкриття . закриття вікна логін
authButton.addEventListener('click', (event) => {
    formLogin.classList.toggle('closeFormLogin')
    event.stopPropagation();

    changeColorButton()
});

document.addEventListener('click', (event) => {
    if (!formLogin.contains(event.target) && !blockPassword.contains(event.target) && !authButton.contains(event.target)) {
        formLogin.classList.add('closeFormLogin')
        changeColorButton()
    }
})

const changeColorButton = () => {
    if (formLogin.classList.contains('closeFormLogin')) {
        authButton.style.color = 'blue'
    } else {
        authButton.style.color = 'red'
    }
}

