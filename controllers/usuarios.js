const { response, request } = require('express');

// Se declara el response llamado en el require para acceder a los metodos, luego de res. 
const usuariosGet = (req, res = response) => {
 
    const {q, nombre = 'No data', apikey, page = 1, limit} = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPost = (req, res = response) => {
    // Se puede declarar el Body de la siguiente manera
    // const body = req.body;
    // Pero es mejor desestructurar para elejir que traer
    // Se asigna el body al request. 
    const { nombre, edad } = req.body;

    res.status(500).json({
        msg: 'get API - controlador',
        nombre, 
        edad,
    });
}

const usuariosPut = (req = request, res = response) => {

    const {id} = req.params;

    res.json({
        msg: 'get API - PUT',
        id,
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'get API - controlador'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'get API - controlador'
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







