const { response, request } = require('express');

// Instalamos bcryptjs Encriptador de contraseñas- NPM i bcryptjs - Lo requerimos
const bcryptjs = require('bcryptjs');

// Se le pone la letra en Mayusculas, para que permita crear instancias.
const Usuario = require('../models/usuario');
// const { Promise } = require('mongoose');


/* GET */
// Se declara el response llamado en el require para acceder a los metodos, luego de res. 
const usuariosGet = async(req = request, res = response) => {
 
    // const {q, nombre = 'No data', apikey, page = 1, limit} = req.query;

    // Creamos la constante usuarios, y con el metodo .find() TRAEMOS TODOS.
    const { limite = 5, desde = 0 } = req.query;
    // Creamos la constante query para indicar que solo traiga los usuarios activos. 
    const query = { estado: true };
    
    // // asignamos la quety que indica que el estado del usuario debe ser true ( activo).
    // const usuarios = await Usuario.find(query)
    // .limit(limite); 
    //  // asignamos la quety que indica que el estado del usuario debe ser true ( activo).
    // const total = await Usuario.countDocuments(query);

    // Encadenado de promesas. No vuelve la respuesta hasta que ambas funciones. Por eso la constante lleva el await.
    // const [ total, usuarios ] = await Promise.all([
    //     Usuario.countDocuments(query),
    //     Usuario.find(query).limit(limite)
    // ]);

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);


    // Asignamos usuarios con el metodo find, en la response del GET.
    res.json({
        // resp
        total,
        usuarios
    });

    // res.json({
    //     msg: 'get API - controlador',
    //     q,
    //     nombre,
    //     apikey,
    //     page,
    //     limit
    // });
}

/* POST */
const usuariosPost = async(req, res = response) => {

    // // Uso de expresss Validator
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(400).json(errors);
    // }



    // Se puede declarar el Body de la siguiente manera
    // const body = req.body;
    // Pero es mejor desestructurar para elejir que traer
    // Se asigna el body al request. 
    const { nombre, correo, password, rol } = req.body;

    // Creamos la instancia de Usuario.
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si el correo existe
    // const existeEmail = await Usuario.findOne({correo});
    // if (existeEmail){
    //     return res.status(400).json({
    //         msg: 'El correo ya esta registrado'
    //     });
    // }


    // Encriptar password // Requiere el metodo salt enSaltSync();
   const salt = bcryptjs.genSaltSync();
   usuario.password = bcryptjs.hashSync( password, salt );
   

    // Guardamos los datos en la DB
    await usuario.save();

    res.json({
        // Enviamos la respuesta del usuario instado.
        usuario

    });
}

/* PUT */
const usuariosPut = async(req , res = response) => {

    const {id} = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // Validar contra DB
    if (password) {
        // Encriptar password // Requiere el metodo salt enSaltSync();
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'get API - controlador'
    });
}



/* DELETE */
const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // const uid = req.uid;

    // Borramos fisicamente.
    // const usuario = await Usuario.findByIdAndDelete( id );
    
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    
    // creamos constante para usuario autenticado.
    // const usuarioAutenticado = req.usuario;

    res.json({
        usuario,
        // usuarioAutenticado
    });
}


// Exportamos los metodos.

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}







