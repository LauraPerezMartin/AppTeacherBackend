const router = require('express').Router();
const bcryptjs = require('bcryptjs');

const { getUsuarioByMail } = require('./../../models/users.model');
const { createToken } = require('./../../utils/helpers');

router.post('/login', async (req, res) => {

    try {
        const [usuarios] = await getUsuarioByMail(req.body.email);

        if (usuarios.length === 0) {
            return res.json({ 'Error': 'Error de usuario y/o contraseña' });
        }

        const usuario = usuarios[0];

        const iguales = bcryptjs.compareSync(req.body.password, usuario.password);//Comprobamos password

        if (!iguales) {
            return res.json({ 'Error': 'Error de usuario y/o contraseña' });
        }

        res.json({ token: createToken(usuario) });
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }

});

router.post('/registro', (req, res) => {

});

module.exports = router;