const jwt = require('jsonwebtoken');

const { getUsuarioById } = require('../models/usuario.model');

const checkToken = async (req, res, next) => {

    //comprobamos si nos llega la cabecera authorization
    if (!req.headers['authorization']) {
        return res.json({ Error: 'Debes incluir la cabecera de autorización' });
    }

    const token = req.headers['authorization'];

    //comprobamos si el token es correcto
    let objToken;
    try {
        objToken = jwt.verify(token, process.env.KEY_TOKEN);
    } catch (error) {
        return res.json({ Error: error.message })
    }

    //recuperamos el usurio logado
    try {
        const [result] = await getUsuarioById(objToken.usuario_id);
        req.usuario = result[0];

    } catch (error) {
        return res.json({ Error: error.menssage })
    }

    next();
}

const checkRol = (rol) => {
    return (req, res, next) => {

        if (req.usuario.rol !== rol) {
            return res.json({ Error: 'No tienes permiso para acceder a esta sección' });
        }

        next();
    }
}

module.exports = { checkToken, checkRol };