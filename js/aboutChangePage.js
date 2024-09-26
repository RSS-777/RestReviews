const formChangeAbout = document.querySelector('.form-change-about');
const infoMessageAbout = document.querySelector('.pages-block__info-message-about');

const renderAboutPage = async () => {
    try {
        const response = await fetch('/page/about')
        const { data } = await response.json()
        if (data && data.length > 0) {
            const elem = data[0];
            console.log('about', data)

            const blockTitle = document.createElement('div')
            const blockText = document.createElement('div')
            const buttonSubmit = document.createElement('button')
            const titleLabel = document.createElement('Label')
            const textLabel = document.createElement('Label')
            const titleInput = document.createElement('input')
            const textArea = document.createElement('textarea')

            titleLabel.textContent = 'Заголовок:'
            textLabel.textContent = 'Текст:'
            buttonSubmit.textContent = 'Зберегти зміни'

            buttonSubmit.classList.add('form-change-about__button')
            titleInput.classList.add('form-change-about__input')
            textArea.classList.add('form-change-about__textarea')

            titleInput.value = elem.title
            textArea.value = elem.text

            buttonSubmit.type = 'submit'
            titleInput.name = 'title'
            textArea.name = 'text'

            blockTitle.append(titleLabel)
            blockTitle.append(titleInput)

            blockText.append(textLabel)
            blockText.append(textArea)

            formChangeAbout.append(blockTitle)
            formChangeAbout.append(blockText)
            formChangeAbout.append(buttonSubmit)

            // Викликаємо функцію для внесення змін у базі данних!
            buttonSubmit.addEventListener('click', (event) => {
                event.preventDefault()
                const titleValue = document.querySelector('.form-change-about__input').value.trim()
                const textValue = document.querySelector('.form-change-about__textarea').value.trim()
                apdatePage(titleValue, textValue)
            })

        }
    } catch (error) {
        console.error('Сталась помилка при отриманні сторінки About:', error)
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderAboutPage()
});


const apdatePage = (titleValue, textValue) => {
    const newForm = new FormData()
    newForm.append('title', titleValue);
    newForm.append('text', textValue);

    if (!titleValue || !textValue) {
        infoMessageAbout.textContent = 'Поля не можуть бути пустими!!!'
    } else {
        infoMessageAbout.textContent = ''
        fetch('/page/about', {
            method: 'POST',
            body: newForm
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    infoMessageAbout.textContent = data.message
                    setTimeout(() => {infoMessageAbout.textContent = ''}, 2000)
                } else {
                    infoMessageAbout.textContent = `${data.message},${data.error}`
                    setTimeout(() => {infoMessageAbout.textContent = ''}, 2000)
                }
            })
            .catch(error => console.error('Помилка при оновленні данних:', error))
    }
};