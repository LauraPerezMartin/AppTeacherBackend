const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const NodeGeocoder = require('node-geocoder');

const { getAsignaturasByProfesorId } = require('../models/profesor-asignatura.model');
const { getPuntuacionMediaByProfesorID, getMejorOpinionByProfesorID } = require('../models/clase.model');

const addAsignaturasValoracionesAProfesores = async (profesores) => {
    //para cada profesor obtenermos asignatura y valoracion media y mejor opinion 
    try {
        for (let profesor of profesores) {
            const [result] = await getAsignaturasByProfesorId(profesor.id);
            const [puntuacion] = await getPuntuacionMediaByProfesorID(profesor.id);
            const [opinion] = await getMejorOpinionByProfesorID(profesor.id);

            profesor.puntuacion = (puntuacion[0]) ? Math.trunc(puntuacion[0].media) : 0;
            profesor.opinion = (opinion[0]) ? opinion[0].opinion : null;
            profesor.asignaturas = result;
        }

        return profesores;
    } catch (error) {
        return error.message;
    }
}

const createToken = (usuario) => {
    const dataToken = {
        usuario_id: usuario.id,
        usuario_rol: usuario.rol,
        exp: dayjs().add(1, 'month').unix()
    }
    return jwt.sign(dataToken, 'Lluvia de ideas');
}

const getCoordenadas = async (ciudad, direccion) => {
    const options = {
        provider: 'openstreetmap',
        city: ciudad,
        country: 'España',
        countrycodes: 'es',
        layer: 'address',
        format: 'json',
        limit: 1

    }
    const geocoder = NodeGeocoder(options);
    const direccionCompleta = `${direccion}, ${ciudad}, España`;
    try {
        const res = await geocoder.geocode(direccionCompleta);
        return res[0];
    } catch (error) {
        return error.message;
    }
}

module.exports = { addAsignaturasValoracionesAProfesores, createToken, getCoordenadas };