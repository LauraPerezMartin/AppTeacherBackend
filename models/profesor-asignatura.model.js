const getAsignaturasByProfesorId = (profesorID) => {
    return db.query('SELECT pa.asignatura_id, a.nombre FROM profesores_asignaturas AS pa, asignaturas AS a WHERE pa.profesor_id = ? AND pa.asignatura_id = a.id', [profesorID])
};

const getListadoAsignaturas = () => {
    return db.query('SELECT DISTINCT pa.asignatura_id, a.nombre FROM profesores_asignaturas AS pa, asignaturas AS a WHERE pa.asignatura_id = a.id');
}

const create = (profesorId, asignaturaId) => {
    return db.query('INSERT INTO profesores_asignaturas (profesor_id, asignatura_id) VALUES (?,?)', [profesorId, asignaturaId]);
}

module.exports = { getAsignaturasByProfesorId, getListadoAsignaturas, create };