export const textareas = () => {
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
}