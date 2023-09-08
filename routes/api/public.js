const router = require('express').Router();
const { getProfesoresPublic } = require('../../models/profesor.model')

router.get('/', async (req, res) => {
    try {
        const [profesores] = await getProfesoresPublic();
        if (profesores.lenght === 0) {
            res.json('No hay profesores');
        }
        res.json(profesores);
    } catch (error) {
        res.status(503).json({ Error: error.message })
    }
})

module.exports = router;