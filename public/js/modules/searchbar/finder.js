import {
    NewHTMLElement
} from '../../functions.js'
import {
    getDatabaseFromServer
} from '../../get_json_database.js'

//The function is responsible for the operation of the search bar.
export const searchbar = (generateContent) => {
    let nameBrand = ''
    let database

//generates buttons in searchbar. Gets data from database, sorts alphabetically, creates buttons and puts to searchbar.
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
            const searchbarBtn = new NewHTMLElement('button', ['search_btn', 'hide'], {
                'type': 'button',
                'data-id': el.id,
                'data-name-brand': el.key
            }, el.key).createHTMLElement()

            document.querySelector('.brand-btns').append(searchbarBtn)
        })
    }
    navGenerate()

    //The function is responible for how the searchabar works
    const finder = () => {
        const finder = document.querySelector('.finder')
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
                } else if (el.dataset.nameBrand.toLowerCase().includes(text.toLowerCase())) {
                    el.classList.remove('hide')
                    el.classList.add('show')
                } else if (e.target.value === 'all') {
                    el.classList.remove('hide')
                    el.classList.add('show')
                } else {
                    el.classList.add('hide')
                    el.classList.remove('show')
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

        //searchbar listeners
        finder.addEventListener('keyup', searchEngine);

        //listener for enter in searchbar. The function checks how many buttons are visible. When more than one is visible, the Enter button has no effect. When one button is visible, the Enter button fills the search bar, enters the entire button name, and after 300 ms generates the content.
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
                e.preventDefault()
            }
        });
    }
    finder()
}