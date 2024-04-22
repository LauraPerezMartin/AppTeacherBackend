const router = require('express').Router();
const { getAllProfesores, getProfesorByUsuarioId, updateValidacion } = require('../../models/profesor.model');
const { deleteById } = require('../../models/usuario.model');
const { addAsignaturasAProfesores } = require('../../utils/helpers');

router.get('/', async (req, res) => {
    //Obtenemos el listado de todos los profesores con sus asignaturas correspondientes
    try {
        const [profesores] = await getAllProfesores();
        const profesoresAsignaturas = await addAsignaturasAProfesores(profesores);

        res.json(profesoresAsignaturas);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }

})

router.get('/profesor/:usuarioId', async (req, res) => {
    //Obtenemos un profesor por su Id de usuario
    try {
        const { usuarioId } = req.params;
        const [result] = await getProfesorByUsuarioId(usuarioId); //recibimos un array con 1 profesor

        const [profesor] = await addAsignaturasAProfesores(result);//le pasamos el array con 1 profesor
        delete profesor.password
        res.json(profesor);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
})

router.patch('/valid/:usuarioId', async (req, res) => {
    //cambiamos la validación a un profesor, si esta validado lo desvalidamos y a la inversa
    const { usuarioId } = req.params;
    const { validacion } = req.body;

    try {
        await updateValidacion(usuarioId, validacion);
        const [result] = await getProfesorByUsuarioId(usuarioId);

        // controlamos si el usuario no existe
        if (result.length === 0) {
            res.json({ Error: 'El usuario no existe' });
        }

        res.json(result[0]);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
})

router.delete('/:usuarioId', async (req, res) => {
    //borrado lógico de usuario
    const { usuarioId } = req.params;

    try {
        const [result] = await getProfesorByUsuarioId(usuarioId);

        if (result.length === 0) {
            res.json({ Error: 'El usuario no existe' })
        }
        await deleteById(usuarioId);

        res.json(result[0]);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }

})

module.exports = router;