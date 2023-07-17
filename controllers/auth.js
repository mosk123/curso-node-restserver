const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");



const login = async( req, res = response ) =>{

    const { correo, password } = req.body;

    try {

        // Verificar si el correo existe // Valida si el correo esta mal.
        const usuario = await Usuario.findOne({correo});
        if (!usuario){
            return res.status(400).json({
                msg: "Usuario y/o contraseña incorrectos - correo"
            });
        }

        // Verificar si el usuario esta activo
        if (!usuario.estado){
            return res.status(400).json({
                msg: "Usuario y/o contraseña incorrectos - estado:false"
            });
        }


        // Verificar la password  // el metodo bcryptjs.compareSync( password, usuario.password ) compara el password, con el password del usuario. Por eso
        // se llama a la funcion con los 2 parametros. // Pass 123321
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if (!validPassword){
            return res.status(400).json({
                msg: "Usuario y/o contraseña incorrectos - password"
            });
        }
        
        // Generar el JWT
        const token = await generarJWT(usuario.id);


        // Siempre debemos tener un solo res.json({}) Si no, da error.
        res.json({
            usuario,
            token

        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Pongase en contacto con el admin"
        });
    }


}

module.exports = {
    login
}







