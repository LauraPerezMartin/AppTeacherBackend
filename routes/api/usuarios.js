const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { getUsuarioById, getUsuarioByMail, create: createUser, update: updateUsuario } = require('../../models/usuario.model');
const { create: createProfesor, getProfesorByUsuarioId, update: updatoProfesor } = require('../../models/profesor.model')
const { create: createAsignaturaProfesor } = require('../../models/profesor-asignatura.model');
const { getAsignaturaById } = require('../../models/asignatura.model');
const { createToken, getCoordenadas, addAsignaturasAProfesores } = require('../../utils/helpers');
const { checkToken } = require('../../utils/middleware');

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

    try {
        const coordenadas = await getCoordenadas(req.body.ciudad, req.body.direccion);
        //obtenemos coordenadar por direccion si devuelve cordenadas se las pasamos si no la pasamos 0
        req.body.latitud = (coordenadas.latitude) ? coordenadas.latitude : 0;
        req.body.longitud = (coordenadas.longitude) ? coordenadas.longitude : 0;

        const [result] = await createUser(req.body);//creamos registro en la tabla usuarios
        const [usuarioArr] = await getUsuarioById(result.insertId);
        let usuario = usuarioArr[0];

        if (usuario.rol != 'profe') {
            return res.json(usuario);
        }

        //Si el rol el profe creamos el registro en la tabla profesores
        const [resultProfesor] = await createProfesor(usuario.id, req.body);
        const [profesorArr] = await getProfesorByUsuarioId(usuario.id)
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
        usuario.asignaturas = asignaturas;
        //usuario = { ...usuario, asignaturas };
        res.json(usuario);
    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
});

router.get('/perfil', checkToken, async (req, res) => {

    if (req.usuario.rol != 'profe') {
        //si no es un profesor pasamos el usuario qur tenemos guardado
        delete req.usuario.password;
        return res.json(req.usuario);
    }

    try {

        //si es un profesor pasamos el usuario profesor con sus asignaturas
        const [result] = await getProfesorByUsuarioId(req.usuario.id);
        const [profesor] = await addAsignaturasAProfesores(result);
        delete profesor.password;
        res.json(profesor);

    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
});

router.put('/update', checkToken, async (req, res) => {
    const rol = req.usuario.rol;
    const usuarioId = req.usuario.id;
    let usuario = {};

    try {
        // si la dirección es distinta obtenemos las nuevas coordenadas
        if (req.usuario.direccion != req.body.direccion) {
            const coordenadas = await getCoordenadas(req.body.ciudad, req.body.direccion);

            req.body.latitud = (coordenadas) ? coordenadas.latitude : 0;
            req.body.longitud = (coordenadas) ? coordenadas.longitude : 0;
        }

        if (rol == 'profe') {
            // si es profesor actualizamos datos de tabla usuarios y profesores
            await updatoProfesor(usuarioId, req.body);
            const [result] = await getProfesorByUsuarioId(usuarioId);
            [usuario] = await addAsignaturasAProfesores(result);

        } else {
            // si no en profesor actualizamos solo los datos de usuario
            await updateUsuario(usuarioId, req.body);
            const [result] = await getUsuarioById(usuarioId);
            usuario = result[0];
        }

        req.usuario = usuario; //guardamos el usuario actualizado 
        delete req.usuario.password;

        res.json(usuario);

    } catch (error) {
        res.status(503).json({ Error: error.message });
    }
})

module.exports = router;