// Carregando Módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Rotas
router.get('/', (req, res) => {
    res.render('tradutor/grade' , {
        style: 'grade.css'
    })
})

module.exports = router