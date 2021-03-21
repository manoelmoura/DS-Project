// Carregando Módulos
    const express = require('express')
    const router = express.Router()
    const mongoose = require('mongoose')

// Rotas
    router.get('/', (req, res) => {
        res.render('index', {
            style: 'home.css'
        })
    })

module.exports = router