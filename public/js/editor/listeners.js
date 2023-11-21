// import {
//     sendDatatoDB
// } from "./baseeditor.js"
// import {
//     addNewElementToDatabase
// } from "./baseeditor.js"
// import {
//     deleteElementFromDataBase
// } from "./baseeditor.js"
// import {
//     addNewStepToOrderingElement
// } from "./baseeditor.js"
// import {
//     deleteLastLine
// } from "./baseeditor.js"


// import {
//     showHideElements
// } from '../../js/functions.js'
// import {
//     RunTinymceEditor
// } from './tinymce_add.js'

export const listeners = () => {
    // const sections = document.querySelectorAll('.section-header')
    // const brands = document.querySelectorAll('.brand__name')
    // const runTinymceEditorBtn = document.querySelectorAll('.brand__btn--tinyMCE')
    // const saveBtn = document.querySelectorAll('.brand__btn--save')
    // const addNewElToDBBtn = document.querySelectorAll('.add-Element-Btn')
    // const deleteELBtn = document.querySelectorAll('.delete-Element-Btn')
    // const addNewLineBtn = document.querySelectorAll('.add-new-line-Btn')
    // const deleteLastLineBtn = document.querySelectorAll('.delete-last-line-Btn')

    const textAreas = document.querySelectorAll('.brand__element-value')

    function limitTextarea(e) {
        e.target.id = "edit"
        const textarea = document.querySelector("#edit");
        const lines = textarea.value.split("\n");

        //sets max. one line in textarea
        if (textarea.dataset.oneliner === 'true') {
            if (lines.length > 1) {
                textarea.value = lines[0];
            }
        }
        //auto resizer 
        else {
            textarea.style.height = `0px`
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }


    textAreas.forEach(el => {
        el.addEventListener('click', limitTextarea)
        el.addEventListener('input', limitTextarea)
        el.addEventListener('blur', () => {
            el.removeAttribute('id')
        })
        // el.addEventListener('keypress', (e) => {
        //     if (e.key === 'Enter' && (el.dataset.oneliner) === 'true') {
        //         e.preventDefault()
        //     }
        // })


    })


    // addNewElToDBBtn.forEach(e => e.addEventListener('click', addNewElementToDatabase))

    // const showContent = (e) => {
    //     console.log(e.target);
    //     e.target.nextElementSibling.classList.toggle('hide')
    //     e.stopPropagation()
    // }

    // sections.forEach(el => {
    //     el.addEventListener('click', showContent)
    // })

    // brands.forEach(el => {
    //     el.addEventListener('click', showContent)
    // })

    // runTinymceEditorBtn.forEach(el => {
    //     el.addEventListener('click', RunTinymceEditor)
    // })
    // saveBtn.forEach(el => {
    //     el.addEventListener('click', sendDatatoDB)
    // })

    // deleteELBtn.forEach(e => e.addEventListener('click', deleteElementFromDataBase))
    // addNewLineBtn.forEach(e => e.addEventListener('click', addNewStepToOrderingElement))
    // deleteLastLineBtn.forEach(e => e.addEventListener('click', deleteLastLine))
}