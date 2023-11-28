const howOrderBoxesHeader = document.querySelectorAll('.how-order__header')

import {
    getDatabaseFromServer
} from '../get_json_database.js'
import {
    searchbar
} from '../modules/searchbar/finder.js'
import {
    blockBody
} from '../functions.js'

//generates content on the main page. Gets an element from database and fills in elements on the main page
const generateContent = async (elem) => {

    const brand = await getDatabaseFromServer(`/getelemfromdatabase?level=brands&id=${elem.id}`)

    const main = document.querySelector('main')

    const brandName = document.querySelector('.brand-name')
    brandName.innerText = brand.name
    brandName.setAttribute('data-id', brand.indexOrder)

    const weOrderViaType = document.querySelector('.we-order-via-type')
    weOrderViaType.innerText = brand.howWeOrder

    const brandUrl = document.querySelector('.brand-url')
    brandUrl.innerHTML = `${brand.url}`
    brandUrl.setAttribute("href", `${brand.url}`)
    brandUrl.setAttribute("target", "_blank")

    const brandSupplier = document.querySelector('.brand-supplier')
    brandSupplier.innerText = brand.supplier

    const fulfilmentLasts = document.querySelector('.fulfilment-lasts')
    fulfilmentLasts.innerHTML = brand.fulfilmentLasts

    const about = document.querySelector('.about')
    about.innerHTML = brand.about

    const details = document.querySelector('.details')
    details.innerHTML = brand.details

    const checkAvailability = document.querySelector('.check-availability').querySelector(':scope > .how-order__info')
    checkAvailability.firstElementChild.innerHTML = brand.checkAvailability

    const orders = document.querySelector('.orders').querySelector(':scope > .how-order__info')
    orders.firstElementChild.innerHTML = brand.orders

    const queries = document.querySelector('.queries').querySelector(':scope > .how-order__info')
    queries.firstElementChild.innerHTML = brand.queries

    const complaints = document.querySelector('.complaints').querySelector(':scope > .how-order__info')
    complaints.firstElementChild.innerHTML = brand.complaints

    const returns = document.querySelector('.returns').querySelector(':scope > .how-order__info')
    returns.firstElementChild.innerHTML = brand.returns

    main.classList.remove('hide')
    main.previousElementSibling.classList.add('hide')
}
searchbar(generateContent)


const showInfo = (e) => {
    e.target.classList.toggle('show')
    e.target.nextElementSibling.classList.toggle('show')
}

howOrderBoxesHeader.forEach(el => {
    el.addEventListener('click', showInfo)
});


//-----------------------------------------------------------------------
// generates content in the ordering instruction section 
const instrContent = document.querySelector('.instruction-content')
const orderingInstructions = document.querySelector('.ordering-instructions')
const instrBtnNext = document.querySelector('.instr-btn--next')
const instrBtnPrev = document.querySelector('.instr-btn--prev')
const instrBtn = document.querySelector('.order-inst-btn')
const instrBtnClose = document.querySelector('.instr-btn--close')

let currentStep = 0;
let stepsNumber = 0

//gets element form ordering database, chooses the step and shows in the ordering intruction
const showInstuction = async (e) => {
    const getOrderingID = document.querySelector('.brand-name').getAttribute('data-id')

    const res = await getDatabaseFromServer(`/getelemfromdatabase?level=ordering&id=${getOrderingID}`)

    currentStep = e
    const stepsArr = []
    for (const data in res) {
        if (data.includes('step')) {
            stepsArr.push(res[data]);
        }
    }

    stepsNumber = stepsArr.length
    instrContent.innerHTML = stepsArr[e - 1]
    orderingInstructions.classList.remove('hide')
}


const startInstruction = () => {
    showInstuction(1)
    blockBody(['header','main'])
}

const nextStepInstruction = () => {
    if (currentStep < stepsNumber) {
        showInstuction(currentStep + 1)
    }
}

const prevStepInstruction = () => {
    if (currentStep > 1) {
        showInstuction(currentStep - 1)
    }
}

const closeInstruction = () => {
    currentStep = 1
    instrContent.innerHTML = ''
    orderingInstructions.classList.add('hide')
    blockBody(['header','main'])

}

instrBtnNext.addEventListener('click', nextStepInstruction)
instrBtnPrev.addEventListener('click', prevStepInstruction)
instrBtn.addEventListener('click', startInstruction)
instrBtnClose.addEventListener('click', closeInstruction)