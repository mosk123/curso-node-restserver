
const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

// Lo expuesto arriba es sustituido por esta manera de importarlo. Se crea en middleweres un INDEX. Se importa en el, y exporta.
const {validarCampos, validarJWT, tieneRole, esAdminRole} = require('../middlewares');

const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { esRolValido, esMailValido, esUsuarioIdValido } = require('../helpers/db-validators');



const router = Router();

// El path se declara en el router del server. Por eso, queda '/'
router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( esUsuarioIdValido ),
    validarCampos
],usuariosPut);

// USamos el express validator
router.post('/', [ 
    
    check('nombre', ' El nombre es obligatorio').not().isEmpty(),
    check('correo', ' El correo no es valido').isEmail(),
    check('correo').custom(esMailValido),
    check('password', ' El password es obligatorio y debe tener mas de 6 letras').isLength({min: 6}),
    // check('rol', ' El Rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    // Siempre traer el middleware validar campo. Recorda que tiene la instancia req, res y next() Si esta OK, sigue la APP si no, arroja el error.
    validarCampos
] ,usuariosPost);

router.delete('/:id', [
    // Se pone primero el de token, ya que si da error, no podra continar. Recorda que es un middleware. Funcion que valida algo antes de continuar.
    validarJWT,
    // Este valida estrictamente si es o no ADMIN el rol para poder eliminar usuarios.
    // esAdminRole,
    // Valida si el usuario tiene rol Admin o Ventas
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( esUsuarioIdValido ),
    validarCampos
] ,usuariosDelete );

router.patch('/', usuariosPatch);


module.exports = router;