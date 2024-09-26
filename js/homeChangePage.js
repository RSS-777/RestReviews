const formChangeHome = document.querySelector('.form-change-home');
const infoMessageHome = document.querySelector('.pages-block__info-message-home');

const renderHomePage = async () => {
    try {
        const response = await fetch(`/page/home`);
        const { data } = await response.json()
        console.log('home', data)
        if (data) {
            const labelTitle = document.createElement('label');
            const inputTitle = document.createElement('input');

            const buttonSubmitFormHome = document.createElement('button')
            buttonSubmitFormHome.setAttribute('type', 'submit')
            buttonSubmitFormHome.textContent = 'Зберегти зміни'
            buttonSubmitFormHome.classList.add('form-change-home__button')

            data.forEach(block => {
                const labelImage = document.createElement('label');
                const inputImage = document.createElement('input');
                const titleBLock = document.createElement('div')
                const imageBLock = document.createElement('div')
                const altBLock = document.createElement('div')
                const image = document.createElement('img');
                const labelAlt = document.createElement('label');
                const inputAlt = document.createElement('input');
                const hr = document.createElement('hr')

                labelTitle.classList.add('form-change-home__label-title');
                labelImage.classList.add('form-change-home__label-image');
                labelAlt.classList.add('form-change-home__label-alt');
                inputTitle.classList.add('form-change-home__input-title');
                inputImage.classList.add('form-change-home__input-image');
                inputAlt.classList.add('form-change-home__input-alt');
                titleBLock.classList.add('form-change-home__title-block');
                altBLock.classList.add('form-change-home__alt-block');
                imageBLock.classList.add('form-change-home__image-block');
                image.classList.add('form-change-home__image');

                labelTitle.textContent = 'Змінити заголовок:'
                labelAlt.textContent = 'Опис картики(alt):'
                inputTitle.value = block.title
                titleBLock.append(labelTitle)
                titleBLock.append(inputTitle)

                inputAlt.value = block.alt_image
                altBLock.append(labelAlt)
                altBLock.append(inputAlt)

                image.src = block.url_image;
                inputImage.value = block.url_image
                labelImage.textContent = 'Змінити url:'
                imageBLock.append(image)
                imageBLock.append(labelImage)
                imageBLock.append(inputImage)

                formChangeHome.append(imageBLock)
                formChangeHome.append(altBLock)
                formChangeHome.append(hr)
                formChangeHome.prepend(titleBLock)
                formChangeHome.append(buttonSubmitFormHome)
            })

            buttonSubmitFormHome.addEventListener('click', (event) => {
                event.preventDefault()
                const dataArray = []
                const titleValueArr = Array.from(document.querySelectorAll('.form-change-home__input-title')).map(title => title.value.trim())
                const altValueArr = Array.from(document.querySelectorAll('.form-change-home__input-alt')).map(alt => alt.value.trim())
                const urlValueArr = Array.from(document.querySelectorAll('.form-change-home__input-image')).map(url => url.value.trim())

                urlValueArr.forEach((url, index) => {
                    const dataObject = {
                        url: url,
                        alt: altValueArr[index]
                    }
                    dataArray.push(dataObject)
                })

                console.log(dataArray, titleValueArr[0])

                updateHomePage(dataArray, titleValueArr[0])
            })
        }
    } catch (error) {
        console.log(error)
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderHomePage()
});

const updateHomePage = async (dataArray, title) => {
    if (dataArray.some(data => !data.url || !data.alt) || !title) {
        infoMessageHome.textContent = 'Поля не можуть бути пустими!!!'
        console.log('Поля не можуть бути пустими!!!')
    } else {
        infoMessageHome.textContent = ''
        const newDataFrom = new FormData()
        newDataFrom.append('dataArray', JSON.stringify(dataArray))
        newDataFrom.append('title', title)

        fetch('/page/home', {
            method: 'POST',
            body: newDataFrom
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    console.log(data.message)
                    infoMessageHome.textContent = data.message
                    setTimeout(() => { infoMessageHome.textContent = '' }, 2000)
                } else {
                    console.log(data.message, data.error)
                    infoMessageHome.textContent = `${data.message},${data.error}`
                    setTimeout(() => { infoMessageHome.textContent = '' }, 2000)
                }
            })
            .catch(error => console.error(error))
    }
};

