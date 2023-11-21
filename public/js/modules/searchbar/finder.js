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
            const btn = $(`<button type="button" class="hide" data-id="${el.id}"data-name-brand="${el.key}">${el.key}</button>`)
            $('.brand-btns').append(btn)
        })
    }
    navGenerate()

    const finder = () => {
        const finder = document.querySelector('.finder')
        // const brandBox = document.querySelector('.brand')
        const brandBtns = document.querySelector('.brand-btns')

        const arr = []

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
                    // brandBox.classList.remove('hide')
                } else if (el.dataset.nameBrand.toLowerCase().includes(text.toLowerCase())) {
                    el.classList.remove('hide')
                } else if (e.target.value === 'a') {
                    el.classList.remove('hide')
                } else {
                    el.classList.add('hide')
                    // brandBox.classList.add('hide')
                }
            })
        }
        const showContent = (e) => {
            nameBrand = e.target.innerText
            generateContent(nameBrand)
            hideFinderBtns()
        }
        //nasłuch na pasek wyszukiwania
        finder.addEventListener('keyup', searchEngine);

        //nasłuch na enter w pasku wyszukiwania
        finder.addEventListener('keypress', function (e) {

            if (e.key === 'Enter') {
                database.forEach(el => {
                    if (el.key.toLowerCase() === e.target.value.toLowerCase()) {
                        nameBrand = e.target.value
                        generateContent(nameBrand)
                        hideFinderBtns()
                    }
                })
                e.preventDefault()
            }
        });
        brandBtns.addEventListener('click', showContent)
    }
    finder()
}