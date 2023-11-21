import {
    NewHTMLElement
} from '../../functions.js'

export const popup = (content, nextStepFunction) => {
    const body = document.querySelector('body')
    body.style.overflow = "hidden"

    const popupWrap = new NewHTMLElement('div', ['popup-wrap'], null, '').createHTMLElement()
    body.appendChild(popupWrap)

    const popup = new NewHTMLElement('div', ['popup'], null, '').createHTMLElement()
    popupWrap.appendChild(popup)


    const popupContent = new NewHTMLElement('div', ['popup__content'], null, '').createHTMLElement()
    popupContent.appendChild(content)
    popup.appendChild(popupContent)
    
    const popupBtns = new NewHTMLElement('div', ['popup__btns'], null, '').createHTMLElement()
    popup.appendChild(popupBtns)

    const cancelBtn = new NewHTMLElement('button', ['popup__btn', 'popup__btn--cancel'], null, 'Cancel').createHTMLElement()
    popupBtns.appendChild(cancelBtn)

    const nextBtn = new NewHTMLElement('button', ['popup__btn', 'popup__btn--cancel'], null, 'Confirm').createHTMLElement()
    popupBtns.appendChild(nextBtn)


    const cancel = () => {
        body.style.overflow = "auto"
        popupWrap.remove()
        cancelBtn.removeEventListener('click', cancel)
        nextBtn.removeEventListener('click', next)
    }

    const next = () => {
        nextStepFunction()
        cancel()
    }

    cancelBtn.addEventListener('click', cancel)
    nextBtn.addEventListener('click', next)

}