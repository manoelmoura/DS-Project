// Carregando Módulos
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Rotas
router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        res.render('tradutor/grade' , {
            style: 'grade.css'
        })  
    }else{
        res.redirect('/')
    }
    
})

module.exports = router