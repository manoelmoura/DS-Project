// Carregando Módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Rotas
router.get('/', (req, res) => {
    res.render('seila')
})

module.exports = router