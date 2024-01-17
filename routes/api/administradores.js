const { getAllProfesores } = require('../../models/profesor.model');
const { addAsignaturasAProfesores } = require('../../utils/helpers');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const [profesores] = await getAllProfesores();
        const profesoresAsignaturas = await addAsignaturasAProfesores(profesores);

        res.json(profesoresAsignaturas);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }

})


module.exports = router;