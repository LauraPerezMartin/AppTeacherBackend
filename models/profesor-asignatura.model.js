const getAsignaturasByProfesorId = (profesorID) => {
    return db.query('SELECT pa.asignatura_id, a.nombre FROM profesores_asignaturas AS pa, asignaturas AS a WHERE pa.profesor_id = ? AND pa.asignatura_id = a.id', [profesorID])
};

const getListadoAsignaturas = () => {
    return db.query('SELECT DISTINCT pa.asignatura_id, a.nombre FROM profesores_asignaturas AS pa, asignaturas AS a WHERE pa.asignatura_id = a.id');
}

module.exports = { getAsignaturasByProfesorId, getListadoAsignaturas };