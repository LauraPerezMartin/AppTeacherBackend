const router = require('express').Router();
const { getProfesoresPublic } = require('../../models/profesor.model');
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

module.exports = router;