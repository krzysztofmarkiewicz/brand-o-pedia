export const RunTinymceEditor = (e) => {

    const allEditableFileds = document.querySelectorAll('.brand__element-value')
    const allEditorBtnsWrapers = document.querySelectorAll('.brand__editor-btns')

    const root = e.target.closest('section').getAttribute('id')
    const key = e.target.closest('.brand__element').firstElementChild.textContent
    const id = e.target.closest('.brand').getAttribute('data-id')
    const content = e.target.closest('.brand__editor-btns').previousSibling

    const startContent = content.value

    const startEditing = () => {
        allEditableFileds.forEach(e => {
            e.setAttribute('disabled', 'true')
            e.classList.remove('editElement')

        })
        allEditorBtnsWrapers.forEach(e => {
            e.classList.add('hide')
        })
    }

    const endEditing = () => {
        allEditableFileds.forEach(e => {
            e.removeAttribute('disabled')
        })
        allEditorBtnsWrapers.forEach(e => {
            e.classList.remove('hide')
        })
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
                    content.value=startContent
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

                fetch("http://192.168.0.17:3020/update", {
                    method: "POST",
                    body: JSON.stringify(item),
                    headers: {
                        "Content-type": "application/json",
                    }

                })
                console.log(item);
            }
            sendItemToBackend()
            endEditing()
        }
    })
}