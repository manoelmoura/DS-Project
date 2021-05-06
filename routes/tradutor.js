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
        res.render('tradutor/sem-login', {
            style: 'sem-login.css'
        })
    }
    
})

module.exports = router