const menuBtn = document.querySelector('.mobile-menu-btn')
const menu = document.querySelector('.menu')
const menuWrap = document.querySelector('.menu-wrap')

const showMenu = () => {
    menuWrap.classList.toggle('showMenuWrap')
    menu.classList.toggle('showMenu')
}

menuBtn.addEventListener('click', showMenu)