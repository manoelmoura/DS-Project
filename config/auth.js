const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Model de usúario
    require('../models/Usuario')
    const Usuario = mongoose.model('usuarios')


module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
        Usuario.findOne({email: email}).then((usuario) => {
            if(!usuario){
                return done(null, false, {message: 'Essa conta não existe'})
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if(batem){
                    return done(null,usuario)
                }else{
                    return done(null, false, {message: 'Senha incorreta'})
                }
            })
        })
    }))

    passport.serializeUser(function(usuario, done){
        done(null, usuario.id)
    })

    passport.deserializeUser(function(id, done){
        Usuario.findById(id, (err, usuario) => {
            done(err, usuario)
        })
    })
}