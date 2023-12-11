import {
    saveLog
} from "./functions_server.js";

function isAuthorized(req, res, next) {

    let url = req.url.replace(/\/|\?/g, '')
    
    if (url === 'main' || url === 'editor') {
        res.cookie('url', url)
    } else {
        res.cookie('url', 'main')
    }
    if (process.env.USER_PASSWORD === req.session.password) {
        saveLog('logged in: ')
        next()
    } else {
        saveLog('Login attempt failed: ')
        res.render('login.ejs')
    }
    // next()
}

export default isAuthorized