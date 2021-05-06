// Carregando Módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Rotas
router.get('/trancar-materia', (req, res) => {
    res.render('tutoriais/tutorial1', {
        style: 'tutorial.css'
    })
})
router.get('/matricula', (req, res) => {
    res.render('tutoriais/tutorial2', {
        style: 'tutoriaispdf.css'
    })
})
router.get('/matricula-extraordinaria', (req, res) => {
    res.render('tutoriais/tutorial3', {
        style: 'tutorial.css'
    })
})
router.get('/volta-as-aulas', (req, res) => {
    res.render('tutoriais/tutorial4', {
        style: 'tutorial.css'
    })
})
router.get('/trancar-matricula', (req, res) => {
    res.render('tutoriais/tutorial5', {
        style: 'tutoriaispdf.css'
    })
})
router.get('/faltas', (req, res) => {
    res.render('tutoriais/tutorial6', {
        style: 'tutorial.css'
    })
})

module.exports = router