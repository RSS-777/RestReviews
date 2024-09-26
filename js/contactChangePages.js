const formChangeContact = document.querySelector('.form-change-contact');
const infoMessage = document.querySelector('.pages-block__info-message-contact');

const renderContactPage = async () => {
    try {
        const response = await fetch('/page/contact')
        const { data } = await response.json()
        if (data) {
            console.log('contact', data)
            const buttonSubmitFormContact = document.createElement('button')
            buttonSubmitFormContact.setAttribute('type', 'submit')
            buttonSubmitFormContact.textContent = 'Зберегти зміни'

            data.forEach(block => {
                const blockCountry = document.createElement('div')
                const blockRegion = document.createElement('div')
                const blockCity = document.createElement('div')
                const blockStreet = document.createElement('div')
                const blockEmail = document.createElement('div')
                const blockTell = document.createElement('div')
                const blockTitle = document.createElement('div')
                const blockViber = document.createElement('div')

                const fieldsetAddress = document.createElement('fieldset')
                const fieldsetContacts = document.createElement('fieldset')
                const legendAddress = document.createElement('legend')
                const legendContacts = document.createElement('legend')

                const labelCountry = document.createElement('label')
                const labelRegion = document.createElement('label')
                const labelCity = document.createElement('label')
                const labelStreet = document.createElement('label')
                const labelEmail = document.createElement('label')
                const labelTell = document.createElement('label')
                const labelTitle = document.createElement('label')
                const labelViber = document.createElement('label')

                const inputCountry = document.createElement('input')
                const inputRegion = document.createElement('input')
                const inputCity = document.createElement('input')
                const inputStreet = document.createElement('input')
                const inputEmail = document.createElement('input')
                const inputTell = document.createElement('input')
                const inputTitle = document.createElement('input')
                const inputViber = document.createElement('input')

                legendAddress.textContent = 'Адреса'
                legendContacts.textContent = 'Контакти'

                labelCountry.textContent = 'Країна:'
                labelRegion.textContent = 'Область:'
                labelCity.textContent = 'Місто:'
                labelStreet.textContent = 'Вулиця:'
                labelEmail.textContent = 'Емейл:'
                labelTell.textContent = 'Телефон:'
                labelTitle.textContent = 'Заголовок:'
                labelViber.textContent = 'Вайбер:'

                inputCountry.value = block.address_country
                inputRegion.value = block.address_region
                inputCity.value = block.address_city
                inputStreet.value = block.address_street
                inputEmail.value = block.email
                inputTell.value = block.tell
                inputTitle.value = block.title
                inputViber.value = block.viber

                inputCountry.classList.add('form-change-contact__country')
                inputRegion.classList.add('form-change-contact__region')
                inputCity.classList.add('form-change-contact__city')
                inputStreet.classList.add('form-change-contact__street')
                inputEmail.classList.add('form-change-contact__email') 
                inputTell.classList.add('form-change-contact__tell')
                inputTitle.classList.add('form-change-contact__title')
                inputViber.classList.add('form-change-contact__viber')

                blockCountry.append(labelCountry)
                blockCountry.append(inputCountry)
                blockRegion.append(labelRegion)
                blockRegion.append(inputRegion)
                blockCity.append(labelCity)
                blockCity.append(inputCity)
                blockStreet.append(labelStreet)
                blockStreet.append(inputStreet)
                blockEmail.append(labelEmail)
                blockEmail.append(inputEmail)
                blockTell.append(labelTell)
                blockTell.append(inputTell)
                blockTitle.append(labelTitle)
                blockTitle.append(inputTitle)
                blockViber.append(labelViber)
                blockViber.append(inputViber)

                fieldsetAddress.prepend(legendAddress)
                fieldsetAddress.append(blockCountry)
                fieldsetAddress.append(blockRegion)
                fieldsetAddress.append(blockCity)
                fieldsetAddress.append(blockStreet)

                fieldsetContacts.prepend(legendContacts)
                fieldsetContacts.append(blockEmail)
                fieldsetContacts.append(blockViber)
                fieldsetContacts.append(blockTell)

                formChangeContact.prepend(blockTitle)
                formChangeContact.append(fieldsetContacts)
                formChangeContact.append(fieldsetAddress)
                formChangeContact.append(buttonSubmitFormContact)
            })

            buttonSubmitFormContact.addEventListener('click', (event) => {
                event.preventDefault()
                const cityValue = document.querySelector('.form-change-contact__city').value.trim()
                const countryValue = document.querySelector('.form-change-contact__country').value.trim()
                const regionValue = document.querySelector('.form-change-contact__region').value.trim()
                const streetValue = document.querySelector('.form-change-contact__street').value.trim()
                const emailValue = document.querySelector('.form-change-contact__email').value.trim()
                const tellValue = document.querySelector('.form-change-contact__tell').value.trim()
                const titleValue = document.querySelector('.form-change-contact__title').value.trim()
                const viberValue = document.querySelector('.form-change-contact__viber').value.trim()

                updateDataContact(cityValue, countryValue, regionValue, streetValue, emailValue, tellValue, titleValue, viberValue)
            })
        }
    } catch (error) {
        console.error('Помилка при отриманні даних з сервера:', error)
    }

};

document.addEventListener('DOMContentLoaded', () => {
    renderContactPage()
})

const updateDataContact = async (cityValue, countryValue, regionValue, streetValue, emailValue, tellValue, titleValue, viberValue) => {
    if(!cityValue || !countryValue || !regionValue || !streetValue || !emailValue || !tellValue || !titleValue || !viberValue) {
        infoMessage.textContent = 'Поля не можуть бути пустими!!!'
    } else {
        infoMessage.textContent = ''
        const newDataFrom = new FormData()
        newDataFrom.append('addressCity', cityValue)
        newDataFrom.append('addressCountry', countryValue)
        newDataFrom.append('addressRegion', regionValue)
        newDataFrom.append('addressStreet', streetValue)
        newDataFrom.append('email', emailValue)
        newDataFrom.append('tell', tellValue)
        newDataFrom.append('title', titleValue)
        newDataFrom.append('viber', viberValue)

        fetch('/page/contact', {
            method: 'Post',
            body: newDataFrom
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    console.log(data.message)
                    infoMessage.textContent = data.message
                    setTimeout(() => {infoMessage.textContent = ''}, 2000)
                } else {
                    console.log(data.message, data.error)
                    infoMessage.textContent = `${data.message},${data.error}`
                    setTimeout(() => {infoMessage.textContent = ''}, 2000)
                }
            })
            .catch(error => console.error(error))
    }
}