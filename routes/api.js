const router = require('express').Router();

router.use('/public', require('./api/public'));

router.use('/users', require('./api/usuarios'));

router.use('/admin', require('./api/administradores'));

module.exports = router;