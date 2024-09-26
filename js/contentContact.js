const titlePage = document.querySelector('.header__title');
const contactEmail = document.querySelector('.contacts__span-email');
const contactViber = document.querySelector('.contacts__span-viber');
const contactTell = document.querySelector('.contacts__span-tell');
const addressCountry = document.querySelector('.address__item-country');
const addressRegion = document.querySelector('.address__item-region');
const addressCity = document.querySelector('.address__item-city');
const addressStreet = document.querySelector('.address__item-street');

document.addEventListener('DOMContentLoaded', () => {
    const getPageContact = async () => {
        try {
            const response = await fetch('/page/contact')
        if (response.ok) {
            const data = await response.json()
            
            const { address_city, address_country, address_region, address_street, email, page_contact_id, tell, title, viber } = data.data[0];
            titlePage.textContent = title;
            contactEmail.textContent = email;
            contactViber.textContent = viber;
            contactTell.textContent = tell;
            addressCountry.textContent = address_country;
            addressRegion.textContent = address_region;
            addressCity.textContent = address_city;
            addressStreet.textContent = address_street;
        }
        } catch (err) {
            console.log('Помилка при отриманні сторінок:', err)
        }
    }
    getPageContact()
})