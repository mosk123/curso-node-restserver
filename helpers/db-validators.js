const role = require('../models/role');
const Usuario = require('../models/usuario')

// Se crea la funcion que valida si existe rol

const esRolValido =  async(rol = '') =>{

    const existeRol = await role.findOne({rol});
    if(!existeRol){
        throw new Error(` El rol ${rol}, no esta registrado en la DB`)
    }
}; 

// Funcion que valida si el mail ya existe.

const esMailValido = async(correo = '')=>{

    const existeEmail = await Usuario.findOne({ correo });
    // SI existe mail, arroja el Error.
    if (existeEmail) {
        throw new Error(` El correo ${correo}, ya esta registrado`);
    }

}

// Funcion que valida si existe un id ya registradi en la DB

const esUsuarioIdValido =  async(id) =>{

    const existeUsuarioPorId = await Usuario.findById(id);
    if(!existeUsuarioPorId){
        throw new Error(` El Id ${id}, no existe en la DB`)
    }
}; 


module.exports = {
    esRolValido,
    esMailValido,
    esUsuarioIdValido
}


