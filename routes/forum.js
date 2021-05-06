// Carregando Módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Rotas
router.get('/', (req, res) => {
    if(req.isAuthenticated()){    
        res.render('forum/forum', {
            style: 'forum.css'
        })
    }else{
        res.render('tradutor/sem-login', {
            style: 'sem-login.css'
        })
    }
})

module.exports = router