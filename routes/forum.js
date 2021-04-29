// Carregando Módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Rotas
router.get('/', (req, res) => {
    res.render('forum/forum', {
        style: 'forum.css'
    })
})

module.exports = router