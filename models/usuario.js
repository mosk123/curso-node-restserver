// Creacion de schema.
const { Schema, model } = require('mongoose');

// Creacion de esquema de usuario que almacenara la DB
const UsuarioSchema = Schema({

    nombre: {
        type: String,
        require: [true, 'El nombre es requerido'],
    },
    correo: {
        type: String,
        require: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'La contraseña es requerida'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        require: false
    }                       

});

// Creamos un metodo global para encriptar la contraseña cuando la trae el request de la consulta.
UsuarioSchema.methods.toJSON = function () {
    // Desestructuramos las variables que deseamos sacar de la respuesta. y con el Spreed creamos todo el nuevo objeto ...usuario
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    // retornamos el usuario sin __v y sin password
    return usuario;
    
}


// Se exporta el MODEL llamado en la importacion de mongoose. En singular, porque mongo le agrega la s, ya que sera una coleccion.
// El model tiene 2 parametros, el nombre que tendra en la DB, y el nombre del Schema.
module.exports = model('Usuario', UsuarioSchema);