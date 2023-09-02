const router = require('express').Router();

router.use('/public', require('./api/public'));

module.exports = router;