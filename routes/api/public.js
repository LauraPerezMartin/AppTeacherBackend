const router = require('express').Router();
const { getProfesoresPublic, getCiudadesConProfesores } = require('../../models/profesor.model');
const { getListadoAsignaturas } = require('../../models/profesor-asignatura.model');
const { addAsignaturasValoracionesAProfesores } = require('../../utils/helpers')

router.get('/', async (req, res) => {
    try {
        const [result] = await getProfesoresPublic();
        if (result.lenght === 0) {
            res.json('No hay profesores');
        }
        const profesores = await addAsignaturasValoracionesAProfesores(result);
        res.json(profesores);
    } catch (error) {
        res.status(503).json({ Error: error.message })
    }
})

router.get('/asignaturas', async (req, res) => {
    try {
        const [result] = await getListadoAsignaturas();
        res.json(result);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
})

router.get('/ciudades', async (req, res) => {
    try {
        const [result] = await getCiudadesConProfesores();
        res.json(result);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
})

module.exports = router;