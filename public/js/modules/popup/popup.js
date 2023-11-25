import {
    NewHTMLElement, blockBody
} from '../../functions.js'

//creates popup on the page 
export const popup = (content, nextStepFunction) => {
    const body = document.querySelector('body')
    // const main = body.querySelectorAll('button, textarea, input')

    //blocks all interactive elements under popup
    // main.forEach(el => el.setAttribute('disabled', 'true'))
    blockBody(['header','main'])

    //generates popup elements on the page
    const popupWrap = new NewHTMLElement('div', ['popup-wrap'], null, '').createHTMLElement()
    body.appendChild(popupWrap)

    const popup = new NewHTMLElement('div', ['popup'], null, '').createHTMLElement()
    popupWrap.appendChild(popup)

    const popupContent = new NewHTMLElement('div', ['popup__content'], null, '').createHTMLElement()
    console.log(popupContent);
    console.log(content);
    popupContent.innerHTML = content
    popup.appendChild(popupContent)

    const popupBtns = new NewHTMLElement('div', ['popup__btns'], null, '').createHTMLElement()
    popup.appendChild(popupBtns)

    const cancelBtn = new NewHTMLElement('button', ['popup__btn', 'popup__btn--cancel'], null, 'Cancel').createHTMLElement()
    popupBtns.appendChild(cancelBtn)
    const nextBtn = new NewHTMLElement('button', ['popup__btn', 'popup__btn--cancel'], null, 'Confirm').createHTMLElement()
    if (nextStepFunction !== undefined) {
        popupBtns.appendChild(nextBtn)
    }

    //function to close a popup
    const cancel = () => {
        blockBody(['header','main'])
        // main.forEach(el => el.removeAttribute('disabled'))

        popupWrap.remove()
        cancelBtn.removeEventListener('click', cancel)
        nextBtn.removeEventListener('click', next)

    }
    //function executing after click confirm
    const next = () => {
        nextStepFunction()
        cancel()
    }
    //listeners
    cancelBtn.addEventListener('click', cancel)
    nextBtn.addEventListener('click', next)

    //function to remove listeners
}