const router = require('express').Router();

const { checkToken, checkRol } = require('../utils/middleware');

router.use('/public', require('./api/public'));

router.use('/users', require('./api/usuarios'));

router.use('/admin', checkToken, checkRol('admin'), require('./api/administradores'));

module.exports = router;