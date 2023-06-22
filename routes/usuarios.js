
const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');


const router = Router();

// El path se declara en el router del server. Por eso, queda '/'
router.get('/', usuariosGet );

router.put('/:id',usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch);


module.exports = router;