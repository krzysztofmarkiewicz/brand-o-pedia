//This function used to hide few elements (also it can be one element) on a page. You need to add a line to your CSS file: .hide{display:none}
// 'First argument "showOrHide" must be a string and must have the value "hide" or "show", second argument must be an array.  e.g. showHideElements = ('show', ['.className']) or showHideElements = ('hide', ['.className','.otherClassName ]
export const showHideElements = (showOrHide, elementsToShowOrHide) => {
    if (Array.isArray(elementsToShowOrHide)) {
        elementsToShowOrHide.forEach(e => {
            const element = document.querySelectorAll(e)
            element.forEach(el => {
                if (showOrHide === 'show') {
                    el.classList.remove(`hide`)
                } else if (showOrHide === 'hide') {
                    el.classList.add(`hide`)
                } else {
                    console.error('First argument "showOrHide" must be a string and must have the value "hide" or "show"');
                }
            })
        })
    } else {
        console.error('Second argument of this function must be an array with only string elements.');
    }
}


//The class is used to create a new element on page. It needs four arguments. 
//1. type of element (e.g. 'button', 'div') - it must be a string
//2. adds classes (e.g. ['className', 'otherClassName']) - it must be an array. It can be an array with one element. You can add few classes.
//3. adds atributes with their value (e.g. {'firstArgument':'value', 'secondArgument':'value'}) - it must be an object. It can be an object with one element. You can add few arguments.
//4.content
//You can create a new element using the createHTMLElement function
// eg. const newElement = new NewHTMLElement('button', ['redBtn', 'menuBtn], '{'type':'submit',}', 'Add It').createHTMLElement()
//Then you can adds element to the page e.g. document.querySelector('body).appendChild(newElement)
export class NewHTMLElement {
    constructor(type, classNames, atributes, content) {
        this.type = type;
        this.classNames = classNames
        this.atributes = atributes
        this.content = content
    }
    createHTMLElement = function () {

        const element = document.createElement(this.type)
        if (this.classNames !== null) {
            this.classNames.forEach(el => {
                element.classList.add(el)
            })
        }
        if (this.atributes !== null) {
            for (const elem in this.atributes) {
                element.setAttribute(elem, this.atributes[elem])
            }
        }

        element.innerHTML = this.content
        return element
    }
}


//gets textareas and sets their height (max. one line or auto height)
export const textareas = (textAreas) => {

    function limitTextarea(e) {
        e.target.id = "edit"
        const textarea = document.querySelector("#edit");
        const lines = textarea.value.split("\n");

        //sets max. one line in the textarea has the data attribute (oneliner === 'true')
        if (textarea.dataset.oneliner === 'true') {
            if (lines.length > 1) {
                textarea.value = lines[0];
            }
        }
        //auto resizer. Sets the height of the textarea to the height of the content.
        else {
            textarea.style.height = `0px`
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }
    //listeners
    textAreas.forEach(el => {
        el.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && (el.dataset.oneliner) === 'true') {
                e.preventDefault()
            }
        })
        el.addEventListener('click', limitTextarea)
        el.addEventListener('input', limitTextarea)
        el.addEventListener('blur', () => {
            el.removeAttribute('id')
        })
    })
}


//blocks/unblocks body (e.g when popup is visible or not) with blocked interactive element in choosed elements (e.g. blockBody(['header','main']) )
export const blockBody = (elementsToBlock) => {
    const body = document.querySelector('body:not(.ordering-instructions)')
    body.classList.toggle('body__blocked')

    elementsToBlock.forEach(el => {
        const element = document.querySelector(el)
        const elements = element.querySelectorAll('button, textarea, checkbox, input,a,[role=button]')
        if (body.classList.contains('body__blocked')) {
            elements.forEach(el => el.setAttribute('tabindex', '-1'))
        } else {
            elements.forEach(el => el.removeAttribute('tabindex'))
        }
    })
}