const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async( req = request, res = response, next) =>{

    // De este modo, puedo leer de la rquest el x-token que viene del header.
    const token = req.header('x-token');
    // Si no hay token en el header, manda el msg: 'No hay token en la peticion'
    if (! token){
        return res.status(400).json({
            msg: 'No hay token en la peticion'
        })
    }


    // Utilizamos try y catch para que continue con la validacion.
    try {
           
        // Verificamos si el JSON Web token tiene la misma firma o no.// Aplica el metodo jwt.verify propio de la libreria instalada "jsonwebtoken"
        // jwt.verify( token , process.env.SECRETORPRIVATEKEY );

        // Extraemos el uid para poder utilizarlo
        const {uid} = jwt.verify( token , process.env.SECRETORPRIVATEKEY );
        
        // Traigo el modelo de usuario, para poder acceder a su id. Arriba declaramos que su id es uid
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(400).json({
                msg: 'Token no Válido - Usuario inexistente en DB'
              })            
        }

        // Verificar si el uid no esta en true
        if (!usuario.estado){
            return res.status(400).json({
              msg: 'Token no Válido - Usuario en estado false'
            })
        }

        // Declaro el uid de la request como uid del usuario
        req.usuario = usuario;
        // Declaro el uid de la request como uid del usuario
        // req.uid = uid;



        // Si el token esta OK ejecuta la funcion Next. Continua con las check de routes/usuarios.
        next();


        // Si da error, manda el msg: 'Token no valido'.
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Token no valido'
        })
        
    }




}

module.exports = {
    validarJWT

}
