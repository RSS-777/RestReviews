const buttonAddComment = document.querySelectorAll('.content__button');

// Додаємо значення + 1 до індексу кнопки (добавити коментар)
let imageId;
buttonAddComment.forEach((button, i) => {
    button.addEventListener('click', () => {
        imageId = i + 1
    })
});

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
                        console.log('Помилка:', data.error)
                    } else {
                        infoLogin.textContent = data.message
                        console.log('Успіх:', data.message, data.user.firstName)

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
                .then(response => response.json().then(data => {
                    if (response.ok) {
                        console.log('Успіх', data.message)

                        setTimeout(() => {
                            checkAuthentication()
                            user.classList.add('close__user')
                            window.location.replace('/')
                            
                        }, 2000)
                    } else {
                        console.error('Помилка:', data.message)
                    }
                }))
                .catch(error => console.error('Помилка запиту:', error))
        })
    }
})

// Перевірка aвтентифікації користувача
const checkAuthentication = (getName) => {
    const registration = document.querySelector('.authentication__link')

    const loginButtonOpen = document.querySelector('.authentication__button-login');
    const userButtonOpen = document.querySelector('.authentication__button-user');
    const userName = document.querySelector('.user__name');
    const userEmail = document.querySelector('.user__email');

    fetch('/user')
        .then(response => response.json())
        .then(data => {
            if (data && data.firstName) {
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