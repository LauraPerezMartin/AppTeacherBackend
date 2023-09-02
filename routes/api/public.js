const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Hola GET');
})

module.exports = router;