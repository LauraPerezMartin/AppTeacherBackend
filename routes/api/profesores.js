const router = require('express').Router();
const { getProfesorByUsuarioId, update } = require('./../../models/profesor.model')
const { getUsuarioById } = require('./../../models/usuario.model')
const { addAsignaturasAProfesores, getCoordenadas } = require('./../../utils/helpers')

//actualizamos datos de profesor
router.put('/', async (req, res) => {
    usuarioId = req.usuario.id;

    try {
        // si la dirección es distinta obtenemos las nuevas coordenadas
        if (req.usuario.direccion != req.body.direccion) {
            const coordenadas = await getCoordenadas(req.body.ciudad, req.body.direccion);

            req.body.latitud = (coordenadas) ? coordenadas.latitude : 0;
            req.body.longitud = (coordenadas) ? coordenadas.longitude : 0;
        }

        await update(usuarioId, req.body);

        const [result] = await getProfesorByUsuarioId(usuarioId);
        const [profesor] = await addAsignaturasAProfesores(result);//le pasamos el array con 1 profesor

        const [resultUsuario] = await getUsuarioById(usuarioId);
        req.usuario = resultUsuario[0]; //guardamos el usuario actualizado 
        delete req.usuario.password;

        res.json(profesor);
    } catch (error) {
        res.status(503).json({ 'Error': 'El usuario no existe' });
    }
});

router.get('/perfil', async (req, res) => {
    usuarioId = req.usuario.id;
    try {
        const [result] = await getProfesorByUsuarioId(usuarioId);
        const [profesor] = await addAsignaturasAProfesores(result);
        delete profesor.password;

        res.json(profesor);
    } catch (error) {
        res.status(503).json({ 'Error': 'El usuario no existe' });
    }
});

module.exports = router;