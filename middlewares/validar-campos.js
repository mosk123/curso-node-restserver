const { validationResult } = require('express-validator');

// Creacion del middleware. Posee 3 arg. Request, response, y el next. Si chekea y esta ok, sigue.
const validarCampos = ( req, res, next ) =>{


    // Uso de expresss Validator
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();

}


module.exports = {
    validarCampos
}
