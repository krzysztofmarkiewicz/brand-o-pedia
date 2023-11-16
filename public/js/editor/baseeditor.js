import {
    listeners
} from './listeners.js'
import {
    getDatabaseFromServer
} from '../get_json_database.js'
import {
    searchbar
} from '../modules/searchbar/finder.js'

const main = document.querySelector('main')
//elements that do not have TinyMCE editor option
const oneLiners = ['name', 'id', 'index', 'url', 'howWeOrder', 'supplier']

const showContent = (e) => {

    e.target.nextElementSibling.classList.toggle('hide')
}
// const xxx = new NewHTMLElement('', [], '', '', '').createHTMLElement()
// xxx.appendChild(xxx)
class NewHTMLElement {
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
        // element.setAttribute(this.atribute[0], this.atribute[1])
        element.innerHTML = this.content
        return element
    }
}

const addNewElement = (parent, jsonData) => {


    const divBrand = new NewHTMLElement('div', ['brand'], {
        'data-id': jsonData.id
    }, '').createHTMLElement()
    parent.appendChild(divBrand)

    const brandName = new NewHTMLElement('p', ['brand__name'], null, jsonData.name).createHTMLElement()
    divBrand.appendChild(brandName)

    const wrapBrandElements = new NewHTMLElement('div', ['brand__wrap-elements', 'hide'], null, '').createHTMLElement()
    divBrand.appendChild(wrapBrandElements)

    for (const key in jsonData) {
        const divBrandElement = new NewHTMLElement('div', ['brand__element'], null, '').createHTMLElement()
        wrapBrandElements.appendChild(divBrandElement)

        const divKey = new NewHTMLElement('div', ['brand__element-name'], null, key).createHTMLElement()
        divBrandElement.appendChild(divKey)

        const divElementEdited = new NewHTMLElement('div', ['brand__element-edited'], null, '').createHTMLElement()
        divBrandElement.appendChild(divElementEdited)

        const divValue = new NewHTMLElement('textarea', ['brand__element-value'], null, jsonData[key]).createHTMLElement()
        divElementEdited.appendChild(divValue)

        const editorBtns = new NewHTMLElement('div', ['brand__editor-btns'], null, '').createHTMLElement()
        divElementEdited.appendChild(editorBtns)

        const saveBtn = new NewHTMLElement('button', ['btn', 'brand__btn', 'brand__btn--save'], null, 'Save').createHTMLElement()
        editorBtns.appendChild(saveBtn)


        if (oneLiners.includes(divKey.textContent)) {
            divValue.dataset.oneliner = true
            divValue.setAttribute('maxlength', '30')
            divValue.setAttribute('rows', '1')
        } else {
            const runTinymceEditorBtn = new NewHTMLElement('button', ['btn', 'brand__btn', 'brand__btn--tinyMCE'], {
                'xxx': 'xxx'
            }, 'TinyMce').createHTMLElement()
            editorBtns.appendChild(runTinymceEditorBtn)
            divValue.setAttribute('rows', '5')
            divValue.dataset.oneliner = false
        }

    }
    const wrapBrandBtns = new NewHTMLElement('div', ['brand__wrap-btns'], null, '').createHTMLElement()
    wrapBrandElements.appendChild(wrapBrandBtns)

    const deleteElementBtn = new NewHTMLElement('button', ['delete-Element-Btn'], null, `Delete ${jsonData.name}`).createHTMLElement()
    wrapBrandBtns.appendChild(deleteElementBtn)
    deleteElementBtn.addEventListener('click', deleteElementFromDataBase)


    if (parent.closest('section').id === 'ordering') {
        const addNewStep = new NewHTMLElement('button', ['add-new-line-Btn'], null, `Add new STEP`).createHTMLElement()
        wrapBrandBtns.appendChild(addNewStep)

        const deleteLastStep = new NewHTMLElement('button', ['delete-last-line-Btn'], null, `Delete last STEP`).createHTMLElement()
        wrapBrandBtns.appendChild(deleteLastStep)

        deleteLastStep.addEventListener('click', deleteLastLine)

    }

    // listeners
    brandName.addEventListener('click', showContent)
    // deleteELBtn.forEach(e => e.addEventListener('click', deleteElementFromDataBase))
    // addNewLineBtn.forEach(e => e.addEventListener('click', addNewStepToOrderingElement))
    // deleteLastStep.addEventListener('click', deleteLastLine)
}



const dataBaseTableGenerate = async () => {
    const jsonData = await getDatabaseFromServer('/database')


    for (const elem in jsonData) {

        const section = new NewHTMLElement('section', null, {
            'id': elem
        }, '').createHTMLElement()
        main.appendChild(section)

        const addElementBtn = new NewHTMLElement('button', ['add-Element-Btn'], {'title':`Add new element to ${elem}`}, '+').createHTMLElement()
    
        section.appendChild(addElementBtn)

        const sectionHeader = new NewHTMLElement('h2', ['section-header'], null, elem).createHTMLElement()
        section.appendChild(sectionHeader)

        const wrapBrands = new NewHTMLElement('div', ['wrap-brands', 'hide'], null, '').createHTMLElement()
        section.appendChild(wrapBrands)

        for (const key in jsonData[elem]) {
            addNewElement(wrapBrands, jsonData[elem][key])


        }

    }

    listeners()


}
dataBaseTableGenerate()



const generateContent = async (elem) => {
    const brand = await getDatabaseFromServer(`/brand?level=brands&name=${elem}`)

    const popup = document.createElement('div')
    popup.classList.add('popup')
    main.appendChild(popup)
    const section = document.createElement('section')
    section.setAttribute('id', 'brands')
    section.innerHTML = `<h2 class='section-header'>brands</h2>`
    popup.appendChild(section)
    const wrapBrands = document.createElement('div')
    wrapBrands.classList.add('wrap-brands', 'hide')
    section.appendChild(wrapBrands)
    const divBrand = document.createElement('div')
    divBrand.classList.add('brand')
    section.appendChild(divBrand)
    divBrand.setAttribute('data-id', brand.id)
    const brandName = document.createElement('p')
    brandName.classList.add('brand-name')
    divBrand.appendChild(brandName)
    brandName.innerText = brand.name
    const wrapBrandElements = document.createElement('div')
    divBrand.appendChild(wrapBrandElements)
    // wrapBrandElements.classList.add('wrap-brand-elements', 'hide')

    for (const key in brand) {
        const divBrandElement = document.createElement('div')
        wrapBrandElements.appendChild(divBrandElement)
        divBrandElement.classList.add('brand-element')
        const divKey = document.createElement('div')
        divKey.classList.add('element-name')
        divBrandElement.appendChild(divKey)
        divKey.textContent = key
        const divValue = document.createElement('div')
        divValue.classList.add('element-value')
        divBrandElement.appendChild(divValue)
        divValue.innerHTML = brand[key]
    }


    // listeners()

}


searchbar(generateContent)


//send data from textarea to database
export const sendDatatoDB = (e) => {
    const allEditableFileds = document.querySelectorAll('.brand__element-value')

    const root = e.target.closest('section').getAttribute('id')
    const key = e.target.closest('.brand__element ').firstElementChild.textContent
    const id = e.target.closest('.brand').getAttribute('data-id')
    const content = e.target.closest('.brand__editor-btns').previousSibling


    let item = {}
    if (key === 'id') {

        alert('NIE MOŻESZ EDYTOWAĆ POLA ID')
        return
    }
    const newContent = e.target.parentElement.previousSibling.value

    item = {
        root: root,
        id: id,
        key: key,
        content: newContent
    }

    fetch("/update", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            "Content-type": "application/json",
        }

    })
}

export const addNewElementToDatabase = (e) => {

    const root = e.target.closest('section').getAttribute('id')
    const addBtns = document.querySelectorAll('.add-Element-Btn')
    const oldContent = e.target.closest('section').lastElementChild
    let newElement

    //set disable addbuttons in half second
    addBtns.forEach(e => {
        e.setAttribute('disabled', 'true')
        const oldContent = e.innerHTML

        let i = 3
        e.innerHTML = oldContent + ' ' + i + 's'
        const counter = () => {
            i -= 1
            e.innerHTML = oldContent + ' ' + i + 's'
        }

        const xxx = setInterval(counter, 1000);
        setTimeout(() => {
            e.removeAttribute('disabled')
            e.innerHTML = oldContent
            clearInterval(xxx)
        }, 3000);
    })


    const getNewID = async (level, key) => {
        const jsonData = await getDatabaseFromServer(`/list?level=${level}&key=${key}`)
        const database = jsonData.elements

        console.log(jsonData);
        const listOfID = database.map(e => {
            const xxx = Number(e.id)
            return xxx
        })


        //gets the higher number from list and +1 and set newID
        const newID = Math.max(...listOfID) + 1
        return newID
    }

    getNewID(root, 'id').then(res => {
        if (!Number.isInteger(res)) {
            console.error('ERROR: It is not possible to update the database. "Probably one or more items in the database have an "ID" that is not a number')
            return
        }

        if (root === 'brands') {
            newElement = {
                "id": String(res),
                "index": "",
                "name": `Nowy element ID: ${String(res)}`,
                "url": "",
                "howWeOrder": "",
                "about": "",
                "supplier": "",
                "fulfilmentLasts": "",
                "details": "",
                "checkAvailability": "",
                "queries": "",
                "orders": "",
                "shipping": "",
                "returns": "",
                "complaints": "",
                "notes": ""
            }
        } else if (root === 'ordering') {
            newElement = {
                "id": String(res),
                "index": "",
                "name": `Nowy element ID: ${String(res)}`,
                "step1": "",
            }
        }


        const item = {
            root: root,
            newElement: newElement
        }
        fetch('/addelement', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json",
            }
        })



        addNewElement(oldContent, newElement)
    })
}

const addNewLineToElement = (e, key) => {
    const addButton = e.target
    const root = addButton.closest('section').id
    const id = addButton.closest('.brand').dataset.id

    const item = {
        root: root,
        id: id,
        key: key,
        value: ''
    }
    fetch('/addnewline', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            "Content-type": "application/json",
        }
    })


    const divBrandElement = new NewHTMLElement('div', ['brand__element'], null, '').createHTMLElement()

    const parentDivBrandElement = e.target.closest('.brand__wrap-elements')
    const parentButtons = e.target.parentElement

    parentDivBrandElement.insertBefore(divBrandElement, parentButtons);

    const divKey = new NewHTMLElement('div', ['brand__element-name'], null, key).createHTMLElement()
    divBrandElement.appendChild(divKey)

    const divElementEdited = new NewHTMLElement('div', ['brand__element-edited'], null, '').createHTMLElement()
    divBrandElement.appendChild(divElementEdited)

    const divValue = new NewHTMLElement('textarea', ['brand__element-value'], null, '').createHTMLElement()
    divElementEdited.appendChild(divValue)

    const editorBtns = new NewHTMLElement('div', ['brand__editor-btns'], null, '').createHTMLElement()
    divElementEdited.appendChild(editorBtns)

    const saveBtn = new NewHTMLElement('button', ['btn', 'brand__btn', 'brand__btn--save'], null, 'Save').createHTMLElement()
    editorBtns.appendChild(saveBtn)


    if (oneLiners.includes(divKey.textContent)) {
        divValue.dataset.oneliner = true
        divValue.setAttribute('maxlength', '30')
        divValue.setAttribute('rows', '1')
    } else {
        const runTinymceEditorBtn = new NewHTMLElement('button', ['btn', 'brand__btn', 'brand__btn--tinyMCE'], {
            'xxx': 'xxx'
        }, 'TinyMce').createHTMLElement()
        editorBtns.appendChild(runTinymceEditorBtn)
        divValue.setAttribute('rows', '5')
        divValue.dataset.oneliner = false
    }


}
const howManyIsOrderingSteps = async (id) => {
    const jsonData = await getDatabaseFromServer(`/numberoforderingsteps?&key=${id}`)
    return jsonData.steps
}
export const addNewStepToOrderingElement = (e) => {
    const id = e.target.closest('.brand').dataset.id

    howManyIsOrderingSteps(id).then(key => addNewLineToElement(e, `step${key+1}`))

}

export const deleteLastLine = (e) => {
    const deleteBtn = e.target
    const root = deleteBtn.closest('section').id
    const stepToDelete = deleteBtn.parentElement.previousSibling
    const id = deleteBtn.closest('.brand').dataset.id

    const item = {
        root: root,
        id: id
    }
    if (stepToDelete.firstElementChild.innerText === 'step1') {
        return
    } else {
        fetch('/dellaststep', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json",
            }
        })

        stepToDelete.remove()
    }


}

export const deleteElementFromDataBase = async (e) => {

    const deleteBtn = e.target
    const root = deleteBtn.closest('section').id
    const elementToDelete = deleteBtn.closest('.brand')
    const id = elementToDelete.dataset.id

    const item = {
        root: root,
        id: id
    }

    elementToDelete.style.display = 'none'

    fetch('/delelement', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            "Content-type": "application/json",
        }
    })

    // const jsonData= await (getDatabaseFromServer(`/list?level=${level}&key=${key}`))

}

// const refreshContent=(oldContent)=>{
//     const oldContent = oldContent

// }