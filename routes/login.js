const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get('/registro', (req, res) => {
    res.render('usuarios/registro', {
        style: 'registro.css',
    })
})

router.post('/registro', (req,res) => {
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome  == null){
        erros.push({texto: 'Nome inválido'})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email  == null){
        erros.push({texto: 'Email inválido'})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha  == null){
        erros.push({texto: 'Senha inválida'})
    }

    if(req.body.senha != req.body.senha2){
        erros.push({texto: 'As senhas são diferentes'})
    }

    if(erros.length > 0){
        res.render('usuarios/registro', {
            style: 'registro.css',
            erros: erros
        })
    }else{
        Usuario.findOne({email: req.body.email}).then((usuario) => {
            if(usuario){
                res.render('usuarios/registro', {
                    style: 'registro.css',
                    email: 'seila meu mano'
                })
            }else{
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if(erro){
                            req.flash('error_msg', 'Houve um erro durante o salvamento do usuario')
                            res.redirect('/')
                        }

                        novoUsuario.senha = hash

                        novoUsuario.save().then(() => {
                            res.render('usuarios/registro', {
                                style: 'registro.css',
                                sucesso: 'aaaa'
                            })
                            console.log('cadastrado')
                        }).catch((err) => {
                            req.flash('error_msg', 'Houve um erro ao criar o usuario')
                            res.redirect('/usuarios/registro')
                        })
                    })
                })
            }
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno')
            res.redirect('/')
        })
    }
})

router.get('/login', (req, res) => {
   res.render('usuarios/login', {
       style: 'login.css',
   })
   req.flash('success_msg', 'Logado com sucesso')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(!user){
            return res.render('usuarios/login', {style: 'login.css', falha: 'aaaaa'})
        }
        req.logIn(user, (err) => {
            return res.render('usuarios/logado', {style: 'logado.css'})
        })
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logout()
    res.render('usuarios/login', {
        style: 'login.css',
        logout: 'logout',
        user: null
    })
})






module.exports = router