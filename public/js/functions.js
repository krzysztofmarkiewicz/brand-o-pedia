//This function used to hide few elements (also it can be one element) on a page. You need to add a line to your CSS file: .hide{display:none}
// 'First argument "showOrHide" must be a string and must have the value "hide" or "show", second argument must be an array.  e.g. showHideElements = ('show', ['.className']) or showHideElements = ('hie', ['.className', ]
export const showHideElements = (showOrHide, elementsToShowOrHide) => {
    console.log('okko');
    if (Array.isArray(elementsToShowOrHide)) {
        elementsToShowOrHide.forEach(e => {
            const element = document.querySelectorAll(e)
            element.forEach(el => {
                if (showOrHide === 'show') {
                    el.classList.remove(`hide`)
                } else if (showOrHide === 'hide') {
                    el.classList.add(`hide`)
                    console.log(el);
                } else {
                    console.error('First argument "showOrHide" must be a string and must have the value "hide" or "show"');
                }
            })
        })
    } else {
        console.error('Second argument of this function must be an array with only string elements.');
    }
}
