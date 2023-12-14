function isAuthorized(req, res, next) {

    let url = req.url.replace(/\/|\?/g, '')

    if (url === 'main' || url === 'editor') {
        res.cookie('url', url)
    } else {
        res.cookie('url', 'main')
    }
    if (process.env.USER_PASSWORD === req.session.password) {
        next()
    } else {
        res.render('login.ejs')
    }
}

export default isAuthorized