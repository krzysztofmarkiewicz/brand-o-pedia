import {
    getDatabaseFromServer
} from '../../get_json_database.js'

export const searchbar = (generateContent) => {
    let nameBrand = ''
    let database
    const navGenerate = async () => {
        const jsondata = await getDatabaseFromServer('/list?level=brands&key=name')
        database = jsondata.elements

        database.sort((a, b) => {
            const nameA = a.key.toUpperCase()
            const nameB = b.key.toUpperCase()
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            // names must be equal
            return 0
        })

        database.map(el => {
            const btn = $(`<button type="button" class="search_btn hide" data-id="${el.id}"data-name-brand="${el.key}">${el.key}</button>`)
            $('.brand-btns').append(btn)
        })
    }
    navGenerate()

    const finder = () => {
        const finder = document.querySelector('.finder')
        // const brandBox = document.querySelector('.brand')
        const brandBtns = document.querySelector('.brand-btns')

        const hideFinderBtns = () => {
            brandBtns.classList.add('hide')
            finder.value = null
        }


        const searchEngine = (e) => {
            brandBtns.classList.remove('hide')
            const text = e.target.value;
            const arr = [...brandBtns.children]

            arr.forEach(el => {
                if (e.target.value === '') {
                    el.classList.add('hide')
                    el.classList.remove('show')
                    // brandBox.classList.remove('hide')
                } else if (el.dataset.nameBrand.toLowerCase().includes(text.toLowerCase())) {
                    el.classList.remove('hide')
                    el.classList.add('show')
                } else if (e.target.value === 'a') {
                    el.classList.remove('hide')
                    el.classList.add('show')
                } else {
                    el.classList.add('hide')
                    el.classList.remove('show')

                    // brandBox.classList.add('hide')
                }
            el.addEventListener('click', showContent)
                
            })

        }
        const showContent = (e) => {
            nameBrand = e.target.innerText
            let id = e.target.getAttribute('data-id')
            const data = {
                nameBrand: nameBrand,
                id: id
            }
            generateContent(data)
            hideFinderBtns()
        }
        //nasłuch na pasek wyszukiwania
        finder.addEventListener('keyup', searchEngine);

        //nasłuch na enter w pasku wyszukiwania
        finder.addEventListener('keypress', function (e) {

            if (e.key === 'Enter') {
                const unHideButtons = document.querySelectorAll('.search_btn.show')
                if (unHideButtons.length === 1) {
                    const id = unHideButtons[0].getAttribute('data-id')
                    finder.value = unHideButtons[0].getAttribute('data-name-brand')
                    const data = {
                        id: id
                    }
                    setTimeout(() => {
                        
                        generateContent(data)
                        hideFinderBtns()
                    }, 300);
                } else {
                    e.preventDefault()
                    return
                }
                // database.forEach(el => {


                //     if (el.key.toLowerCase() === e.target.value.toLowerCase()) {
                //         const data = {
                //             nameBrand: e.target.value
                //         }
                //         generateContent(data)
                //         hideFinderBtns()
                //     }
                // })
                e.preventDefault()
            }
        });
        // brandBtns.forEach(e => {
        //     addEventListener('click', showContent)
        // })
    }
    finder()
}