const { response, request } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");



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


const googleSingIn = async( req = request, res = response ) =>{

    const { id_token } = req.body;

    try {

        const {nombre, img, correo} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){

            // Si no existe el usuario, lo creamos con esta DATA

            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            }
            usuario = new Usuario(data);
            await usuario.save();
        }


        // SI el usuario esta en false en la base denegamos la entrada

        if(!usuario.estado){
           return res.status(401).json({
            msg: 'Pongase en contacto con el admin. Usuario bloqueado' 
        })
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'NO se pudo verificar token'
        })
    }


}

module.exports = {
    login,
    googleSingIn

}







