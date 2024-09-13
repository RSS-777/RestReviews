const body = document.querySelector('body');
const input = document.querySelector('.burger-menu__input');
const nav = document.querySelector('.nav');
const buttonAddComment = document.querySelectorAll('.content__button');
const contentPost = document.querySelectorAll('.content__post')
const modalView = document.querySelector('.modal');
const modal__close = document.querySelector('.modal__close');

let imageId;
buttonAddComment.forEach((button, i) => {
    button.addEventListener('click', () => {
        imageId = i + 1
    })
});

// burger menu
input.addEventListener('change', () => {
    if (input.checked) {
        nav.style.top = '0';
    } else {
        nav.style.top = '-100%';
    }
})

//add comment
buttonAddComment.forEach((buttElement, index) => buttElement.addEventListener('click', () => {
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

// Отримання коментарів і вивід їх на сторінку
fetch('/comments')
    .then(response => response.json()
        .then(data => {
            data.forEach((comment) => {
                const button = buttonAddComment[comment.image_id - 1]
                if (button) {
                    const newPost = document.createElement('div')
                    const userName = document.createElement('span')
                    const contentText = document.createElement('p')

                    userName.classList.add('content__user')
                    contentText.classList.add('content__text')

                    userName.innerText = comment.name;
                    contentText.innerText = comment.text;

                    newPost.appendChild(userName)
                    newPost.appendChild(contentText)

                    if (contentPost) {
                        contentPost[comment.image_id - 1].appendChild(newPost)
                    }
                    notComment() // запускаю повідомлення якщо не має коментарів
                }
            })
        })
    )

    .catch(err => console.error('Помилка при завантаженні коментарів', err))

// функція для виводу повідомлення що не має коментарів
const notComment = () => {
    setTimeout(() => {

        if (contentPost) {
            contentPost.forEach((element, index) => {
                const hasName = element.querySelector('.content__name') !== null;
                const hasText = element.querySelector('.content__text') !== null;

                if (!hasName && !hasText) {
                    const notComment = document.createElement('p');
                    notComment.classList.add('content__no-comment');
                    notComment.innerText = 'Тут може бути ваш коментар';

                    if (!element.querySelector('.content__no-comment'))
                        element.appendChild(notComment)
                }
            })
        }
    }, 0)
}

// додавання коментарів до бази даних
document.addEventListener('DOMContentLoaded', () => {
    const infoSend = document.querySelector('.info-send');
    const form = document.querySelector('.form-comment');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            checkAuthentication((name) => {
                const text = form.querySelector('#text').value.trim();

                if (!text) {
                    infoSend.textContent = 'Будь ласка, заповніть всі поля.';
                } else {
                    const formData = new FormData(form);
                    formData.append('image_id', imageId);
                    formData.append('name', name);

                    fetch('/comments', {
                        method: 'POST',
                        body: formData
                    })
                        .then(response => response.json())
                        .then(formDataBase => {
                            infoSend.textContent = `${formDataBase.data.name} ваш ${formDataBase.message}`;
                            setTimeout(() => {
                                window.location.href = '/';
                            }, 2000)
                        })

                        .catch(error => {
                            console.error('Помилка при відправці даних:', error);
                        })
                }
            })
        });
    }
});

//форма регістрації
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-registration')
    const infoSend = document.querySelector('.info-send');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault()
            const firstName = document.getElementById('firstName').value.trim()
            const lastName = document.getElementById('lastName').value.trim()
            const birthday = document.getElementById('birthday').value.trim()
            const email = document.getElementById('email').value.trim()
            const password = document.getElementById('password').value.trim()

            if (!firstName || !lastName || !birthday || !email || !password) {
                infoSend.textContent = 'Будь ласка, заповніть всі поля.'
            } else {
                const newFormData = new FormData(form)
                fetch('./registration', {
                    method: 'POST',
                    body: newFormData
                })
                    .then(response => response.json().then(data => {
                        if (response.ok) {
                            infoSend.textContent = `${data.data}: ${data.message}`;
                            setTimeout(() => {
                                window.location.href = '/';
                            }, 2000)
                        } else {
                            infoSend.textContent = `${data.message}: ${data.error}`
                        }
                    }))
                    .catch(error => {
                        console.error('Помилка при відпаравлені форми', error)
                    })
            }
        })
    }
})

//login (вхід в систему)
document.addEventListener('DOMContentLoaded', (event) => {
    const formLogin = document.querySelector('.formLogin')

    formLogin.addEventListener('submit', (event) => {
        event.preventDefault()

        const inputEmail = (document.querySelector('.inputEmail').value.trim())
        const inputPassword = (document.querySelector('.inputPassword').value.trim())
        const infoLogin = document.querySelector('.infoLogin')

        if (!inputEmail || !inputPassword) {
            infoLogin.textContent = 'Поле не може бути пустим!'
            return
        }

        const loginData = {
            email: inputEmail,
            password: inputPassword
        }

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
            .then(response => response.json()
                .then(data => {
                    if (!response.ok) {
                        infoLogin.textContent = data.error
                    } else {
                        infoLogin.textContent = data.message

                        setTimeout(() => {
                            formLogin.classList.add('closeFormLogin')
                            authButton.style.color = 'blue'
                            checkAuthentication()
                            window.location.href = '/'; 
                        }, 2000)

                    }
                }))
            .catch(error => {
                infoLogin.textContent = 'Cталася помилка під час входу!'
                console.error('Error:', error)
            })
    })
})

// Запуск автонтифікації користувача, після переходу на інші сторінки
document.addEventListener('DOMContentLoaded', (event) => {
    checkAuthentication()
});

// Перевірка aвтентифікації користувача
const checkAuthentication = (getName) => {
    const registration = document.querySelector('.authentication__link')
    const buttonAddComment = document.querySelectorAll('.content__button');
    const loginButtonOpen = document.querySelector('.authentication__button-login');
    const userButtonOpen = document.querySelector('.authentication__button-user');
    const userName = document.querySelector('.user__name');
    const userEmail = document.querySelector('.user__email');

    fetch('/user')
        .then(response => response.json())
        .then(data => {
            if (data && data.firstName) {
                console.log('Успішний вхід:', data.firstName)
                registration.style.display = 'none'
                loginButtonOpen.style.display = 'none'
                userButtonOpen.style.display = 'flex'
                userButtonOpen.textContent = data.firstName
                buttonAddComment.forEach(button => button.disabled = false);
                userName.textContent = data.firstName
                userEmail.textContent = data.email
                if (getName) {
                    getName(data.firstName)
                }   
            } else {
                loginButtonOpen.style.display = 'flex'
                registration.style.display = 'block'
                userButtonOpen.style.display = 'none'
                buttonAddComment.forEach(button => button.disabled = true);
            }
        })

        .catch(error => console.error('Помилка перевірки автентифікації:', error))
};

// Виход з сесії
document.addEventListener('DOMContentLoaded', () => {
    const userOutButton = document.querySelector('.user__In-Out-button')
    const user = document.querySelector('.user')

    if (userOutButton) {
        userOutButton.addEventListener('click', (event) => {
            event.preventDefault();

            fetch('/logout', {
                method: 'POST'
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Вихід успішний')

                        setTimeout(() => {
                            checkAuthentication()
                            user.classList.add('close__user')
                        }, 2000)
                    } else {
                        console.error('Помилка при виході з сесії')
                    }
                })
                .catch(error => console.error('Помилка запиту:', error))
        })
    }
})