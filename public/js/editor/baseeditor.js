import {
    getDatabaseFromServer
} from '../get_json_database.js'
import {
    searchbar
} from '../modules/searchbar/finder.js'
import {
    RunTinymceEditor
} from './tinymce_add.js'
import {
    NewHTMLElement, textareas
} from '../functions.js'
import {
    popup
} from '../modules/popup/popup.js'

const main = document.querySelector('main')


//elements that do not have TinyMCE editor option
const oneLiners = ['name', 'id', 'indexOrder', 'url', 'howWeOrder', 'supplier']


const showContent = (e) => {
    e.target.nextElementSibling.classList.toggle('hide')
}

//generates new line in the element of database on the page
const addNewLineInElement = (parent, nameElement, content) => {
    const divBrandElement = new NewHTMLElement('div', ['brand__element'], null, '').createHTMLElement()
    parent.appendChild(divBrandElement)

    const divKey = new NewHTMLElement('div', ['brand__element-name'], null, nameElement).createHTMLElement()
    divBrandElement.appendChild(divKey)

    const divElementEdited = new NewHTMLElement('div', ['brand__element-edited'], null, '').createHTMLElement()
    divBrandElement.appendChild(divElementEdited)

    const divValue = new NewHTMLElement('textarea', ['brand__element-value'], {
        'rows': '1'
    }, content).createHTMLElement()
    divElementEdited.appendChild(divValue)

    const editorBtns = new NewHTMLElement('div', ['brand__editor-btns'], null, '').createHTMLElement()
    divElementEdited.appendChild(editorBtns)

    const saveBtn = new NewHTMLElement('button', ['btn', 'brand__btn', 'brand__btn--save'], null, 'Save').createHTMLElement()
    editorBtns.appendChild(saveBtn)
    saveBtn.addEventListener('click', sendDatatoDB)

    if (oneLiners.includes(divKey.textContent)) {
        divValue.dataset.oneliner = true
        divValue.setAttribute('maxlength', '30')
        divValue.style.resize = 'none'
    } else {
        const runTinymceEditorBtn = new NewHTMLElement('button', ['btn', 'brand__btn', 'brand__btn--tinyMCE'], {
            'xxx': 'xxx'
        }, 'TinyMce').createHTMLElement()
        editorBtns.appendChild(runTinymceEditorBtn)
        divValue.dataset.oneliner = false
        runTinymceEditorBtn.addEventListener('click', RunTinymceEditor)
    }
}

//generates new element of database on the page and put it in the parent element
const addNewElement = (parent, jsonData) => {
    const divBrand = new NewHTMLElement('div', ['brand'], {
        'data-id': jsonData.id,
        'id': parent.closest('section').id + "-" + jsonData.id
    }, '').createHTMLElement()
    parent.appendChild(divBrand)
    const brandName = new NewHTMLElement('button', ['brand__name'], null, jsonData.name).createHTMLElement()
    divBrand.appendChild(brandName)
    brandName.addEventListener('click', showContent)

    const wrapBrandElements = new NewHTMLElement('div', ['brand__wrap-elements', 'hide'], null, '').createHTMLElement()
    divBrand.appendChild(wrapBrandElements)

    const BrandElements = new NewHTMLElement('div', ['brand__elements'], null, '').createHTMLElement()
    wrapBrandElements.appendChild(BrandElements)


    for (const key in jsonData) {
        addNewLineInElement(BrandElements, key, jsonData[key])
    }

    const wrapBrandBtns = new NewHTMLElement('div', ['brand__wrap-btns'], null, '').createHTMLElement()
    wrapBrandElements.appendChild(wrapBrandBtns)

    const deleteElementBtn = new NewHTMLElement('button', ['delete-Element-Btn'], null, `Delete ${jsonData.name}`).createHTMLElement()
    wrapBrandBtns.appendChild(deleteElementBtn)


    deleteElementBtn.addEventListener('click', deleteElement)


    if (parent.closest('section').id === 'ordering') {
        const addNewStep = new NewHTMLElement('button', ['add-new-line-Btn'], null, `Add new STEP`).createHTMLElement()
        wrapBrandBtns.appendChild(addNewStep)

        const deleteLastStep = new NewHTMLElement('button', ['delete-last-line-Btn'], null, `Delete last STEP`).createHTMLElement()
        wrapBrandBtns.appendChild(deleteLastStep)

        addNewStep.addEventListener('click', addNewStepToOrderingElement)
        deleteLastStep.addEventListener('click', deleteLine)
    }
}

//gets whole database and generate root elements on the page with all elements
const dataBaseTableGenerate = async () => {
    const jsonData = await getDatabaseFromServer('/database')
    //gets root element and creates main roots (sections)
    for (const elem in jsonData) {

        const section = new NewHTMLElement('section', null, {
            'id': elem,
        }, '').createHTMLElement()
        main.appendChild(section)

        const sectionHeader = new NewHTMLElement('button', ['section-header'], null, elem).createHTMLElement()
        section.appendChild(sectionHeader)
        sectionHeader.addEventListener('click', showContent)

        const wrapBrands = new NewHTMLElement('div', ['wrap-brands', 'hide'], null, '').createHTMLElement()
        section.appendChild(wrapBrands)

        const addElementBtn = new NewHTMLElement('button', ['add-Element-Btn'], {
            'title': `Add new element to ${elem}`
        }, `+ New element`).createHTMLElement()
        wrapBrands.appendChild(addElementBtn)
        addElementBtn.addEventListener('click', addElement)

        //sorts elements ascending by name
        jsonData[elem].sort((a, b) => {
            const nameA = a.name.toUpperCase()
            const nameB = b.name.toUpperCase()
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
        for (const key in jsonData[elem].sort((a, b) => {
                a.name - b.name
            })) {
            addNewElement(wrapBrands, jsonData[elem][key])
        }
    }
    
    const textAreas = document.querySelectorAll('.brand__element-value')
    textareas(textAreas)
}
dataBaseTableGenerate()

const generateContent = async (elem) => {
    const root = document.querySelector('#brands').querySelector(':scope > .wrap-brands')
    const element = root.querySelector(`#brands-${elem.id}`).querySelector(':scope > .brand__wrap-elements')
    root.classList.remove('hide')
    element.classList.remove('hide')
    window.location.href = '#brands-' + elem.id
}
searchbar(generateContent)


//send data from textarea to database after click the SAVE button
const sendDatatoDB = (e) => {
    const root = e.target.closest('section').id
    const key = e.target.closest('.brand__element ').firstElementChild.textContent
    const id = e.target.closest('.brand').getAttribute('data-id')
    const content = e.target.closest('.brand__wrap-elements').previousSibling.innerHTML

    let item = {}
    if (key === 'id') {

        alert('NIE MOŻESZ EDYTOWAĆ POLA ID')
        return
    }
    const newContent = e.target.parentElement.previousSibling.value

    item = {
        root: 'root',
        id: id,
        key: key,
        content: newContent
    }
    console.log('Updated database: '+item);


    fetch("/update", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            "Content-type": "application/json",
        }
    })

    if (key === 'name') {
        const searchbarBtn = document.querySelector(`[data-name-brand="${content}"]`)
        searchbarBtn.innerText = newContent
        // searchbarBtn.removeAttribute('data-name-brand')
        searchbarBtn.setAttribute('data-name-brand', newContent)

        e.target.closest('.brand__wrap-elements').previousSibling.innerHTML = newContent
    }
}

//add new element to the database
const addElement = (e) => {
    const addButton = e.target
    const root = addButton.closest('section').id
    const oldContent = addButton.closest('section').lastElementChild
    const nextStep = () => {
        addNewElementToDatabase(root, oldContent)
    }

    const infoPopup = 'Czy na pewno chcesz dodać nowy element'

    popup(infoPopup, nextStep)
}
//adds new element to database, to the page and the button to the searchbar
const addNewElementToDatabase = (root, oldContent) => {
    let newElement

    //checks heighest id in the database and return this ID+1
    const getNewID = async (level, key) => {
        const jsonData = await getDatabaseFromServer(`/list?level=${level}&key=${key}`)
        const database = jsonData.elements

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
                "indexOrder": "",
                // "name": `- New element ID: ${String(res)} -`,
                "name": `- New element`,
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
                "indexOrder": "",
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
        const addNewElemToSearchBar = () => {
            const searchbar = document.querySelector('.brand-btns')

            const newElem = new NewHTMLElement('button', ['hide'], {
                'data-id': newElement.id,
                'data-name-brand': newElement.name
            }, newElement.name).createHTMLElement()
            searchbar.appendChild(newElem)


            const allBtns = [...searchbar.querySelectorAll('button')]

            allBtns.sort(function (a, b) {
                if (a.innerText.toLowerCase() < b.innerText.toLowerCase()) {
                    return -1;
                }
                if (a.innerText.toLowerCase() > b.innerText.toLowerCase()) {
                    return 1;
                }
                return 0;
            })
            searchbar.innerText = ''
            allBtns.forEach(e => {
                searchbar.appendChild(e)
            })
        }
        addNewElemToSearchBar()
    })
}

//add new line to an element of a database
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

    const parentDivBrandElement = e.target.parentElement.previousSibling
    addNewLineInElement(parentDivBrandElement, key, '')
}

//checks how many steps has an ordering element and return it
const howManyIsOrderingSteps = async (id) => {
    const jsonData = await getDatabaseFromServer(`/numberoforderingsteps?&key=${id}`)
    return jsonData.steps
}

//opens the popup for adding new line (a step in the ordering instruction) in the element
const addNewStepToOrderingElement = (e) => {
    const id = e.target.closest('.brand').dataset.id


    const nextStep = () => {
        howManyIsOrderingSteps(id).then(key => addNewLineToElement(e, `step${key+1}`))
    }

    const infoPopup = 'Czy na pewno chcesz usunąć ten element'

    popup(infoPopup, nextStep)
}

//delete new line from an element of a database and from the page
const deleteLastLine = (root, id) => {
    const stepToDelete = document.querySelector(`#${root}-${id}`).lastElementChild.firstElementChild.lastElementChild

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
        }).then(req => {
            if (req.status === 200) {
                stepToDelete.remove()
            }
        })
    }
}

//opens the popup for deleting element
const deleteLine = (e) => {

    const deleteBtn = e.target
    const root = deleteBtn.closest('section').id
    const id = deleteBtn.closest('.brand').dataset.id

    const nextStep = () => {
        deleteLastLine(root, id)
    }

    const infoPopup = 'Czy na pewno chcesz usunąć ten element'

    popup(infoPopup, nextStep)
}


//delete element from database
const delElemToSearchBar = (id) => {
    const elem = document.querySelector(`[data-id="${id}"].search_btn`)
    elem.remove()
}

// deletes element from database and from the page 
const deleteElementFromDataBase = (root, id) => {
    const elementToDelete = document.querySelector(`#${root}-${id}`)

    const item = {
        root: root,
        id: id
    }

    fetch('/delelement', {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            "Content-type": "application/json",
        }
    }).then((req) => {
        if (req.status === 200) {
            elementToDelete.remove()
            delElemToSearchBar(id)
        }
    })
}

//opens the popup for deleting element
const deleteElement = (e) => {

    const deleteBtn = e.target
    const root = deleteBtn.closest('section').id
    const id = deleteBtn.closest('.brand').dataset.id

    const nextStep = () => {
        deleteElementFromDataBase(root, id)
    }

    const infoPopup = 'Czy na pewno chcesz usunąć ten element'

    popup(infoPopup, nextStep)
}