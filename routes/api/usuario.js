const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { getUsuarioById, getUsuarioByMail, create: createUser } = require('../../models/usuario.model');
const { create: createProfesor, getProfesorById } = require('./../../models/profesor.model')
const { create: createAsignaturaProfesor } = require('./../../models/profesor-asignatura.model');
const { getAsignaturaById } = require('../../models/asignatura.model');
const { createToken } = require('./../../utils/helpers');

router.post('/login', async (req, res) => {

    try {
        const [usuarios] = await getUsuarioByMail(req.body.email);

        if (usuarios.length === 0) {
            return res.json({ 'Error': 'Error de usuario y/o contraseña' });
        }

        const usuario = usuarios[0];

        const iguales = bcrypt.compareSync(req.body.password, usuario.password);//Comprobamos password

        if (!iguales) {
            return res.json({ 'Error': 'Error de usuario y/o contraseña' });
        }

        res.json({ token: createToken(usuario) });
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }

});

router.post('/registro', async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8); //encriptamos password
    req.body.latitud = 0;
    req.body.longitud = 0;

    try {
        const [result] = await createUser(req.body);//creamos registro en la tabla usuarios
        const [usuarioArr] = await getUsuarioById(result.insertId);
        let usuario = usuarioArr[0];

        if (usuario.rol != 'profe') {
            return res.json(usuario);
        }

        //Si el rol el profe creamos el registro en la tabla profesores
        const [resultProfesor] = await createProfesor(usuario.id, req.body);
        const [profesorArr] = await getProfesorById(resultProfesor.insertId)
        const profesor = profesorArr[0];

        delete profesor.id;
        delete profesor.usuario_id;

        usuario = { ...usuario, ...profesor };

        //Si tiene asignaturas añadimos las asignaturas a la tabla profesores_asignaturas

        if (!req.body.asignaturas) {
            return res.json(usuario);
        }

        const asignaturasArr = req.body.asignaturas;
        const asignaturas = [];

        for (let asignatura of asignaturasArr) {
            const [result] = await getAsignaturaById(asignatura);
            if (result.length > 0) {
                await createAsignaturaProfesor(usuario.id, asignatura);
                asignaturas.push(result[0].nombre);
            }
        }

        usuario = { ...usuario, asignaturas };
        res.json(usuario);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }

});

module.exports = router;