// Carregando Módulos   
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const path = require('path')
    const mongoose = require('mongoose')
    const session = require('express-session')
    const flash = require('connect-flash')
    const passport = require('passport')
    const mainroute = require('./routes/mainroute')
    const usuarios = require('./routes/login')
    const tradutor = require('./routes/tradutor')
    require('./config/auth')(passport)
    const sobrenos = require('./routes/sobrenos')
    const mapa = require('./routes/mapa')
    const forum = require('./routes/forum')
    const tutoriais = require('./routes/tutoriais')
    const db = require('./config/db')

// Config
    // Session
        app.use(session({
            secret: 'guiaunb',
            resave: true,
            saveUninitialized: true
        }))

        app.use(passport.initialize())
        app.use(passport.session())

        app.use(flash())
    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            res.locals.error = req.flash('error')
            res.locals.user = req.user || null;
            next()
        })
    // Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    // Handlebars
        app.use(express.static('public'))
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    // Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect(db.mongoURI).then(() => {
            console.log('Conectado ao mongo')
        }).catch((err) => {
            console.log('Erro ao se conectar: ' + err)
        })
    // Public
        app.use(express.static(path.join(__dirname, 'public')))


// Routes
    app.use('/', mainroute)
    app.use('/usuarios', usuarios)
    app.use('/tradutor', tradutor)
    app.use('/sobrenos', sobrenos)
    app.use('/mapa', mapa)
    app.use('/forum', forum)
    app.use('/tutoriais', tutoriais)

// Outros
    const PORT = process.env.PORT || 8081
    app.listen(PORT, () => {
        console.log('Servidor Rodando!')
    })