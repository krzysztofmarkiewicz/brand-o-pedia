const howOrderBoxesHeader = document.querySelectorAll('.how-order__header')

import {
    getDatabaseFromServer
} from '../get_json_database.js'
import {
    searchbar
} from '../modules/searchbar/finder.js'





const generateContent = async (elem) => {
    const brand = await getDatabaseFromServer(`/brand?level=brands&name=${elem}`)
   
    $(".brand-name").text(brand.name);
    $(".we-order-via-type").text(brand.howWeOrder)
    $(".brand-url").html(brand.url)
    $(".brand-url").attr("href", `http://www.${brand.url}`)
    $(".brand-url").attr("target", "_blank")
    $(".brand-supplier").text(brand.supplier)
    $(".fulfilment-lasts").html(brand.fulfilmentLasts)
    $(".about").html(brand.about)
    $(".details").html(brand.details)
    $(".info-box").children("span").text(brand.name)
    $(".check-availability").children("div").html(brand.checkAvailability)
    $(".orders").children("div").html(brand.orders)
    $(".queries").children("div").html(brand.queries)
    $(".complaints").children("div").html(brand.complaints)
    $(".returns").children("div").html(brand.returns)
    
    $(".brand").show()
    $(".order-inst-btn").show()
    
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
// generates an ordering instruction section 
let currentStep = 0;
let stepsNumber = 0

const showInstuction = async (e) => {
    const getType = $('.we-order-via-type').text()

    const jsondata = await getDatabaseFromServer(`/orderingsteps?name=${getType}`)

    currentStep = e
    const stepsArr = []
    for (const data in jsondata) {
        if (data.includes('step')) {
            stepsArr.push(jsondata[data]);
        }
    }
    stepsNumber = stepsArr.length
    $(".instruction-content").html(stepsArr[e - 1])
    $(".ordering-instructions").show()
}

const startInstruction = () => {
    $(".order-inst-btn").click(showInstuction(1))
}

const nextStepInstruction = () => {
    if (currentStep < stepsNumber) {
        $(".order-inst-btn").click(showInstuction(currentStep + 1))
    }
}

const prevStepInstruction = () => {
    if (currentStep > 1) {
        $(".order-inst-btn").click(showInstuction(currentStep - 1))
    }
}

const closeInstruction = () => {
    currentStep = 1
    $(".instruction-content").html('')
    $(".ordering-instructions").hide()
}

$('.instr-btn--next').click(nextStepInstruction)
$('.instr-btn--prev').click(prevStepInstruction)
$(".order-inst-btn").click(startInstruction)
$('.instr-btn--close').click(closeInstruction)


