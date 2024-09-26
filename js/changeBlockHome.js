const blocksContainer = document.querySelector('.blocks-container');

const renderBlocks = async () => {
    const response = await fetch(`/page/home`);
    const { data } = await response.json()
    console.log('blocks', data)
    if (data) {
        const contentAddBlock = document.createElement('div')
        const blockUrlAdd = document.createElement('div')
        const blockAltAdd = document.createElement('div')
        const inputUrl = document.createElement('input')
        const labelUrl = document.createElement('label')
        const inputAlt = document.createElement('input')
        const labelAlt = document.createElement('label')
        const buttonAddNewBlock = document.createElement('button')

        buttonAddNewBlock.setAttribute('type', 'button')
        inputUrl.setAttribute('placeholder', '..//images/1670421706_10-kartinkin-net-p-kartinka-orel-v-nebe-vkontakte-10.jpg')
        inputAlt.setAttribute('placeholder', 'Image eagle')

        contentAddBlock.classList.add('content-add-block')
        blockUrlAdd.classList.add('content-add-block__block-url')
        blockAltAdd.classList.add('content-add-block__block-alt')
        inputUrl.classList.add('content-add-block__input-url')
        labelUrl.classList.add('content-add-block__label-url')
        inputAlt.classList.add('content-add-block__input-alt')
        labelAlt.classList.add('content-add-block__label-alt')
        buttonAddNewBlock.classList.add('content-add-block__button')

        buttonAddNewBlock.textContent = 'Додати новий блок'
        labelUrl.textContent = 'Url картинки:'
        labelAlt.textContent = 'Alt картинки (Опишіть що за картинка):'

        blockUrlAdd.append(labelUrl)
        blockUrlAdd.append(inputUrl)
        blockAltAdd.append(labelAlt)
        blockAltAdd.append(inputAlt)
        contentAddBlock.append(blockUrlAdd)
        contentAddBlock.append(blockAltAdd)
        contentAddBlock.append(buttonAddNewBlock)

        data.forEach(blockData => {
            const contentBlocks = document.createElement('div')
            const blockImage = document.createElement('div')
            const blockInfo = document.createElement('div')
            const image = document.createElement('img')
            const spanUrl = document.createElement('span')
            const spanAlt = document.createElement('span')
            const buttonDelete = document.createElement('button')

            image.src = blockData.url_image
            spanUrl.textContent = blockData.url_image
            spanAlt.textContent = blockData.alt_image

            buttonDelete.setAttribute('type', 'button')
            buttonDelete.textContent = 'Видалити блок'

            contentBlocks.classList.add('blocks-content')
            blockImage.classList.add('blocks-content__block-image')
            blockInfo.classList.add('blocks-content__block-info')
            image.classList.add('blocks-content__image')
            spanUrl.classList.add('blocks-content__span-url')
            spanAlt.classList.add('blocks-content__span-alt')
            buttonDelete.classList.add('blocks-content__button')

            blockImage.append(image)
            blockInfo.append(spanUrl)
            blockInfo.append(spanAlt)
            contentBlocks.append(blockImage)
            contentBlocks.append(blockInfo)
            contentBlocks.append(buttonDelete)
            blocksContainer.append(contentBlocks)
            blocksContainer.append(contentAddBlock)
        })
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderBlocks()
});