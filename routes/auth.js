const { Router } = require('express');

const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();



// El path se declara en el router del server. Se asigna login. Este ira al final de la ruta. Ej: {{url}}/api/auth/login . Si dejo solo '/' la ruta quedaria {{url}}/api/auth
router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', ' La contraseña es obligatoria').not().isEmpty(),
    validarCampos
] ,login );

router.post('/google', [
    check('id_token', 'id_token de google es necesario').not().isEmpty(),
    validarCampos
] ,googleSingIn );










module.exports = router;


