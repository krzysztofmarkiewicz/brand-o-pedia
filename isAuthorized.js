function isAuthorized(req, res, next) {
    function timeCount() {
        const today = new Date();

        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();

        const hour = today.getHours();
        if (hour < 10) hour = "0" + hour;

        const minute = today.getMinutes();

        const second = today.getSeconds();

        return year + '.' + month + '.' + day + ' - ' + hour + ':' + minute + ':' + second
    }

    let url = req.url.replace(/\/|\?/g, '')
    if (url === 'main' || url === 'editor') {
        res.cookie('url', url)
    } else {
        res.cookie('url', 'main')
    }
    if (process.env.USER_PASSWORD === req.session.password) {
        console.log('logged in: ' + timeCount());

        next()
    } else {
        res.render('login.ejs')
    }


    // next()
}

export default isAuthorized