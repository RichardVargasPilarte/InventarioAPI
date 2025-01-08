const { Router } = require('express'); // import Router from express
const { body } = require('express-validator');

const { obtenerUsuarios } = require('../controllers/usuarioController');
const router = Router();

router.get('/', obtenerUsuarios);

module.exports = router;