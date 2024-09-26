const headerTitle = document.querySelector('.header__title');
const content = document.querySelector('.content');
const infoComment = document.createElement('div');
infoComment.textContent = 'Коментарі можуть залишати лиш авторизовані користувачі!';
infoComment.classList.add('info-comment');

const renderPage = async () => {
    let name;
    try {
        const response = await fetch(`/page/home`);
        const { data } = await response.json();

        if (data) {
            headerTitle.textContent = data[0].title;

            const blockContentPosts = [];

            data.forEach(block => {
                const contentImageContainer = document.createElement('div');
                const image = document.createElement('img');
                const blockContentPost = document.createElement('div');
                const buttonAddPost = document.createElement('button');

                contentImageContainer.classList.add('content__image-container');
                image.classList.add('content__image');
                blockContentPost.classList.add('content__post');
                buttonAddPost.classList.add('content__button');

                buttonAddPost.setAttribute('disabled', 'true');
                buttonAddPost.textContent = 'Додати коментар';

                image.setAttribute('src', block.url_image);
                image.setAttribute('alt', block.alt_image);
                contentImageContainer.append(image);
                contentImageContainer.append(blockContentPost);
                blockContentPost.append(buttonAddPost);
                content.append(contentImageContainer);

                blockContentPosts.push(blockContentPost);
            });

                  // Виклик функції відкрити закрити модальне вікно для добавлення
                  modalWindow()

            // Отримання коментарів і вивід їх на сторінку
            fetch('/comments')
                .then(response => response.json())
                .then(data => {
                    data.forEach(comment => {
                        const postElement = blockContentPosts[comment.image_id - 1];
                        if (postElement) {
                            const newPost = document.createElement('div');
                            const userName = document.createElement('span');
                            const contentText = document.createElement('p');

                            userName.classList.add('content__user');
                            contentText.classList.add('content__text');

                            userName.innerText = comment.name;
                            contentText.innerText = comment.text;

                            newPost.appendChild(userName);
                            newPost.appendChild(contentText);
                            postElement.appendChild(newPost);
                        }
                    });
                    notComment(blockContentPosts); // Запускаємо функцію для перевірки коментарів
                })
                .catch(err => console.error('Помилка при завантаженні коментарів', err));

            // Перевірка наявності коментарів
            const notComment = (blocks) => {
                setTimeout(() => {
                    blocks.forEach((element) => {
                        const hasName = element.querySelector('.content__user') !== null;
                        const hasText = element.querySelector('.content__text') !== null;

                        if (!hasName && !hasText) {
                            const noComment = document.createElement('p');
                            noComment.classList.add('content__no-comment');
                            noComment.innerText = 'Тут може бути ваш коментар';

                            if (!element.querySelector('.content__no-comment')) {
                                element.appendChild(noComment);
                            }
                        }
                    });
                }, 0);
            };

            // Перевірка користувача щоб вивести інформацію що потрібно зареєструватись щоб додавати коментарі
            fetch('/user')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Мережевий запит не вдалося виконати');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.firstName) {
                        const buttonAddComment = document.querySelectorAll('.content__button');
                        buttonAddComment.forEach(button => button.disabled = false);
                    } else {
                        content.append(infoComment);
                        buttonAddComment.forEach(button => button.disabled = true);
                    }
                })
                .catch(error => console.log('Помилка отримання даних з сервера:', error));
            checkAuthentication()
        }
    } catch (error) {
        console.log('Помилка при отриманні сторінки і блоку з бази даних', error);
    }
};

renderPage();

const modalWindow = () => {
    const body = document.querySelector('body');
    const modalView = document.querySelector('.modal');
    const modal__close = document.querySelector('.modal__close');
    const modalButtonAddComment = document.querySelectorAll('.content__button');

    //add comment
    if (modalButtonAddComment.length > 0) {
        modalButtonAddComment.forEach((buttElement) => {
            buttElement.addEventListener('click', () => {
                modalView.style.display = 'block';
                body.classList.add('no-scroll');
            });
        });
    }

    //close modal view
    if (modal__close) {
        modal__close.addEventListener('click', () => {
            console.log('Модальна кнопка натиснута');
            modalView.style.display = 'none';
            body.classList.remove('no-scroll');
        });
    }
}

