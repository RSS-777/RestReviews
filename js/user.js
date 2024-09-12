//вхід користувача в сесію
const authentication__item = document.querySelector('.authentication__item');
const userOpenMenuButton = document.querySelector('.authentication__button-user')

const user = document.createElement('div')
const userName = document.createElement('span')
const userEmail = document.createElement('span')
const userOutButton = document.createElement('button')

user.classList.add('user', 'close__user')
userName.classList.add('user__name')
userEmail.classList.add('user__email')
userOutButton.classList.add('user__In-Out-button')

userOutButton.textContent = 'Вийти з системи'
userName.textContent = 'Іван'
userEmail.textContent = 'sfdsd@com.uz'

user.appendChild(userName)
user.appendChild(userEmail)
user.appendChild(userOutButton)
authentication__item.appendChild(user)

// Відкриття і закриття user блоку
userOpenMenuButton.addEventListener('click', (event) => {
    event.stopPropagation();
    user.classList.toggle('close__user')
    changeColorButt()
});

document.addEventListener('click', (event) => {
    event.stopPropagation();

    if (!user.contains(event.target) && !userOutButton.contains(event.target)) {
        user.classList.add('close__user')

        changeColorButt()
    }
})

const changeColorButt = () => {
    if (user.classList.contains('close__user')) {
        userOpenMenuButton.style.color = 'blue'
    } else {
        userOpenMenuButton.style.color = 'red'
    }
};