import {
    NewHTMLElement, blockBody
} from '../../functions.js'

//creates popup on the page 
export const popup = (content, nextStepFunction) => {
    const body = document.querySelector('body')

    //blocks all interactive elements under popup
    blockBody(['header','main'])

    //generates popup elements on the page
    const popupWrap = new NewHTMLElement('div', ['popup-wrap'], null, '').createHTMLElement()
    body.appendChild(popupWrap)

    const popup = new NewHTMLElement('div', ['popup'], null, '').createHTMLElement()
    popupWrap.appendChild(popup)

    const popupContent = new NewHTMLElement('div', ['popup__content'], null, '').createHTMLElement()
    popupContent.innerHTML = content
    popup.appendChild(popupContent)

    const popupBtns = new NewHTMLElement('div', ['popup__btns'], null, '').createHTMLElement()
    popup.appendChild(popupBtns)

    const cancelBtn = new NewHTMLElement('button', ['popup__btn', 'popup__btn--close'], null, 'Close').createHTMLElement()
    popupBtns.appendChild(cancelBtn)
    const nextBtn = new NewHTMLElement('button', ['popup__btn', 'popup__btn--confirm'], null, 'Confirm').createHTMLElement()
    if (nextStepFunction !== undefined) {
        cancelBtn.innerText='Cancel'
        popupBtns.appendChild(nextBtn)
    }

    cancelBtn.focus()


    //function to close a popup
    const cancel = () => {
        blockBody(['header','main'])

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
}