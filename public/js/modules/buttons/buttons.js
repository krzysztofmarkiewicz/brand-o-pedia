import {
    popup
} from "../popup/popup.js"

const menuBtn = document.querySelector('.mobile-menu-btn')
const menu = document.querySelector('.menu')
const showMenu = (e) => {
    menu.classList.toggle('show-menu')
}

menuBtn.addEventListener('click', showMenu)


//blocked doubleClick for all buttons
const allBtns = document.querySelectorAll('button')
allBtns.forEach(e => {
    e.addEventListener('dblclick', () => {
        return
    })
})

//help button
const helpBtn = document.querySelector('.help-btn')

const content = '<div class="help" id="help"><div class="help__content"><h2>HELP</h2><br><div><p>Wyszukiwarka</p><ul><li>Wpisując w wyszukiwarkę "all" wyświetli wszystkie marki</li><li>Podczas wpsiywania nazwy marki gdy zostanie już jedna, której odpowiada ciąg znaków, możesz klinąć ENTER, a aplikacja uzupełni nazwę do końca i potwierdzi.</li></ul></div><br><div><p>Edytor</p><ul><li>Jeśli do danej marki jest dostępna instrukcja zamawiania, wpisz w polu indexOrder odpowiedni ID tej instrukcji</li><li>Po każdej zmianie danego pola, aby dane zapisały się do bazy musisz klikanć przycisk SAVE, lub kliknąć ikonę zapisy w edytorze TinyMCE </li><li>Pola które nia mają dostępnego edytora TinyMCE przyjmują maksymalną długość tekstu równą 30 znaków i muszą mieścić się w jednej linii</li></ul></div><br><div><p>Obsługa</p><ul><li>Aplikację można obsługiwać samą klawiaturą, bez użycia myszki. Wyjątkiem jest użycie edytora TinyMCE. Będzie to wprowadzone w następnej wersji.</li></ul></div></div></div>'

helpBtn.addEventListener('click', (e) => {
    popup(content)
    menu.classList.remove('show-menu');
    e.preventDefault()
})