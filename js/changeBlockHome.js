const blocksContainer = document.querySelector('.blocks-container');

document.addEventListener('DOMContentLoaded', () => {
    renderBlocks()
});

const renderBlocks = async () => {
    const response = await fetch(`/page/home`);
    const { data } = await response.json()
    console.log('blocks', data)
    if (data) {
        const formAddNewBlock = document.createElement('form')
        const blockUrlAdd = document.createElement('div')
        const blockAltAdd = document.createElement('div')
        const inputUrl = document.createElement('input')
        const labelUrl = document.createElement('label')
        const inputAlt = document.createElement('input')
        const labelAlt = document.createElement('label')
        const buttonAddNewBlock = document.createElement('button')
        const infoSubmit = document.createElement('p')

        buttonAddNewBlock.setAttribute('type', 'button')
        inputUrl.setAttribute('placeholder', '..//images/1670421706_10-kartinkin-net-p-kartinka-orel-v-nebe-vkontakte-10.jpg')
        inputAlt.setAttribute('placeholder', 'Image eagle')

        formAddNewBlock.classList.add('form-add-block')
        blockUrlAdd.classList.add('form-add-block__block-url')
        blockAltAdd.classList.add('form-add-block__block-alt')
        inputUrl.classList.add('form-add-block__input-url')
        labelUrl.classList.add('form-add-block__label-url')
        inputAlt.classList.add('form-add-block__input-alt')
        labelAlt.classList.add('form-add-block__label-alt')
        infoSubmit.classList.add('form-add-block__info-submit')
        buttonAddNewBlock.classList.add('form-add-block__button')

        buttonAddNewBlock.textContent = 'Додати новий блок'
        labelUrl.textContent = 'Url картинки:'
        labelAlt.textContent = 'Alt картинки (Опишіть що за картинка):'

        blockUrlAdd.append(labelUrl)
        blockUrlAdd.append(inputUrl)
        blockAltAdd.append(labelAlt)
        blockAltAdd.append(inputAlt)
        formAddNewBlock.append(blockUrlAdd)
        formAddNewBlock.append(blockAltAdd)
        formAddNewBlock.append(buttonAddNewBlock)
        formAddNewBlock.append(infoSubmit)

        data.forEach(blockData => {
            const contentBlocks = document.createElement('div')
            const blockImage = document.createElement('div')
            const blockInfo = document.createElement('div')
            const image = document.createElement('img')
            const spanUrl = document.createElement('span')
            const spanAlt = document.createElement('span')
            const buttonDelete = document.createElement('button')
            const infoMessageDelete = document.createElement('p')

            image.src = blockData.url_image
            spanUrl.textContent = blockData.url_image
            spanAlt.textContent = blockData.alt_image

            buttonDelete.setAttribute('type', 'button')
            buttonDelete.setAttribute('data-block-id', blockData.block_id)
            infoMessageDelete.setAttribute('data-block-id', blockData.block_id)
            buttonDelete.textContent = 'Видалити блок'

            contentBlocks.classList.add('blocks-content')
            blockImage.classList.add('blocks-content__block-image')
            blockInfo.classList.add('blocks-content__block-info')
            image.classList.add('blocks-content__image')
            spanUrl.classList.add('blocks-content__span-url')
            spanAlt.classList.add('blocks-content__span-alt')
            buttonDelete.classList.add('blocks-content__button')
            infoMessageDelete.classList.add('blocks-content__info-message')

            blockImage.append(image)
            blockInfo.append(spanUrl)
            blockInfo.append(spanAlt)
            contentBlocks.append(blockImage)
            contentBlocks.append(blockInfo)
            contentBlocks.append(infoMessageDelete)
            contentBlocks.append(buttonDelete)
            blocksContainer.append(contentBlocks)
            blocksContainer.append(formAddNewBlock)
        })

        const buttonDeleteBlock = document.querySelectorAll('.blocks-content__button')
        if (buttonDeleteBlock) {
            buttonDeleteBlock.forEach(button => {
                button.addEventListener('click', (event) => {
                    const blockId = button.getAttribute('data-block-id')
                    deleteBlock(blockId, button)
                })
            })
        }

        const buttonNewBlock = document.querySelector('.form-add-block__button')
        buttonNewBlock.addEventListener('click', (event) => {
            event.preventDefault()
            const urlValue = document.querySelector('.form-add-block__input-url').value.trim()
            const altValue = document.querySelector('.form-add-block__input-alt').value.trim()
            addBlock(urlValue, altValue)
        })
    }
};

const deleteBlock = (blockId, button) => {
    const obj = {
        idBlock: blockId,
        methodChange: 'del',
    }

    fetch('/page/block', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log(data.message)
                const infoMessageDelete = document.querySelectorAll('.blocks-content__info-message')
                infoMessageDelete.forEach(elem => {
                    if (elem.getAttribute('data-block-id') === blockId) {
                        elem.textContent = data.message
                        button.setAttribute('disabled', true)
                        button.classList.add('blocks-content__button-disabled')
                        setTimeout(() => {
                            elem.textContent = ''
                            setTimeout(() => window.location.reload(), 0);
                        }, 2000)
                    }
                })
            } else {
                console.log(data.message, data.error)
            }
        })
        .catch(error => console.error(error))
}

const addBlock = (urlValue, altValue) => {
    const infoSubmit = document.querySelector('.form-add-block__info-submit')
    const newDataForm = new FormData();
    newDataForm.append('methodChange', 'add')
    newDataForm.append('url', urlValue)
    newDataForm.append('alt', altValue)

    if (!urlValue || !altValue) {
        infoSubmit.textContent = 'Поля не можуть бути пустими!!!'
        setTimeout(() => { infoSubmit.textContent = '' }, 2000)
    } else {
        fetch('/page/block', {
            method: 'POST',
            body: newDataForm
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    console.log('Повідомлення Успіх:', data.message)
                    infoSubmit.textContent = data.message
                    setTimeout(() => {
                        infoSubmit.textContent = ''
                        setTimeout(() => window.location.reload(), 0);
                    }, 2000)
                } else {
                    console.log('Повідомлення:', data.message, 'Попилка:', data.error)
                    infoSubmit.textContent = data.message
                    setTimeout(() => { infoSubmit.textContent = '' }, 2000)
                }
            })
            .catch(error => {
                console.error(error)
            })
    }
}  