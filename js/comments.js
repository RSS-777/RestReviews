const contentPost = document.querySelectorAll('.content__post')

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

