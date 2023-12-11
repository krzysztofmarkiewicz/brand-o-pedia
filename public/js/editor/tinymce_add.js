import {
    blockBody
} from '../functions.js'
import {
    popup
} from '../modules/popup/popup.js'

export const RunTinymceEditor = (e) => {
    const parentTinyMCE = e.target.closest('.brand__element-edited')
    const buttonsToHide = parentTinyMCE.lastChild

    const root = e.target.closest('section').getAttribute('id')
    const key = e.target.closest('.brand__element').firstElementChild.textContent
    const id = e.target.closest('.brand').getAttribute('data-id')
    const content = e.target.closest('.brand__editor-btns').previousSibling

    const startContent = content.value

    const startEditing = () => {
        parentTinyMCE.classList.add('parent-tinymce')
        blockBody(['main', 'header'])
        buttonsToHide.classList.add('hide')
    }

    const endEditing = () => {
        parentTinyMCE.classList.remove('parent-tinymce')
        blockBody(['main', 'header'])
        buttonsToHide.classList.remove('hide')
        tinymce.remove()
        content.removeAttribute('disabled')
    }

    startEditing()

    let item = {}
    if (key === 'id') {

        alert('NIE MOŻESZ EDYTOWAĆ POLA ID')
        return
    }

    content.classList.add('editElement')


    tinymce.init({
        selector: '.editElement',
        // inline: true,
        plugins: 'link autolink image table save',
        toolbar: 'save close',
        setup: function (editor) {
            editor.ui.registry.addButton('close', {
                text: 'Close',
                onAction: function () {
                    endEditing()
                    content.value = startContent
                }
            })
        },
        save_onsavecallback: function () {
            const sendItemToBackend = (e) => {
                const newContent = tinymce.activeEditor.getContent({
                    format: 'html'
                })

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
                console.log('Updated database:');
                console.log(item);
            }
            sendItemToBackend()
            endEditing()
            popup('Zapisano')
        }
    })
}