import 'dotenv/config'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import express from "express"
const app = express()
import cors from "cors"
app.use(cors())
import ejsLayouts from 'express-ejs-layouts'
import path from 'path'
const __dirname = path.resolve()
import databaseController from './databaseController.js'

//Static files
app.use(express.static(path.join(__dirname, './public')))

//Set templating Engine
// app.use(ejsLayouts)
// app.set('layout', './main.ejs')
app.set('view engine', 'ejs')
app.set('views', './pages')

app.use(express.json())

app.use(cookieParser())

app.use(session({
    secret: '1',
    resave: false,
    saveUninitialized: true
}))

import isAuthorized from './isAuthorized.js'

//loginpage: encodes the password you enter and matches it to the password in the .env file
app.post('/login', express.urlencoded({
    extended: false
}), function (req, res) {

    req.session.regenerate(function (err) {
        if (err) next(err)
        req.session.password = req.body.password
        req.session.save(function (err) {
            if (err) return next(err)
            if (req.url === 'main' || req.url === 'editor') {
                res.redirect(req.url)
            } else {
                res.redirect(`main`)
            }
            // res.redirect('main')
        })
    })
})

app.get('/', isAuthorized, (req, res) => {
    res.render('main')
})

app.get('/editor', isAuthorized, (req, res) => {
    res.render('editor')
})

app.get('/main', isAuthorized, (req, res) => {
    res.render('main')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/logout', function (req, res, next) {
    req.session.password = null
    req.session.save(function (err) {
        if (err) next(err)

        req.session.regenerate(function (err) {
            if (err) next(err)
            res.redirect('/')
        })
    })
})

app.post('/update', databaseController.updateDatabase)
app.post('/addelement', databaseController.addElementToDataBase)
app.post('/delelement', databaseController.deleteElementFromDataBase)
app.post('/addnewline', databaseController.addNewLinetoElement)
app.post('/dellaststep', databaseController.deleteLastStep)
app.get('/database', databaseController.getWholeDatabase)
app.get('/getelemfromdatabase', databaseController.getElemfromDB)
app.get('/numberoforderingsteps', databaseController.getNumberOfOrderingSteps)
app.get('/list', databaseController.getListsofElementsByKeyFromDB)

export default app