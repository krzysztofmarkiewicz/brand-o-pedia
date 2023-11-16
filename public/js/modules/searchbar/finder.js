import {
    getDatabaseFromServer
} from '../../get_json_database.js'

export const searchbar = (generateContent) => {
    let nameBrand = ''

    const navGenerate = async () => {
        const jsondata = await getDatabaseFromServer('/list?level=brands&key=name')
        const database = jsondata.elements
        //sorts the 'database' array by key 'name'
        // The key we want to sort by (e.g. 'name' for name)
        let sortKey = 'key';

        // A function that compares objects based on the selected key
        function compareObjects(a, b) {
            if (a[sortKey] < b[sortKey]) {
                return -1;
            }
            if (a[sortKey] > b[sortKey]) {
                return 1;
            }
            return 0;
        }
        // Sorts the table
        database.sort(compareObjects);
        database.map(el => {
            const btn = $(`<button type="button" class="hide" data-id="${el.id}"data-name-brand="${el.key}">${el.key}</button>`)
            $('.brand-btns').append(btn)
        })
    }
    navGenerate()

    const finder = () => {
        const finder = document.querySelector('.finder')
        const brandBox = document.querySelector('.brand')
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
                    brandBox.classList.remove('hide')
                } else if (el.dataset.nameBrand.toLowerCase().includes(text.toLowerCase())) {
                    el.classList.remove('hide')
                } else if (e.target.value === 'all') {
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
                nameBrand = e.target.value
                generateContent(nameBrand)
                hideFinderBtns()
                e.preventDefault()
            }
        });

        brandBtns.addEventListener('click', showContent)

    }
    finder()
}