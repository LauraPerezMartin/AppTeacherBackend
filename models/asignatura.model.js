const getAsignaturaById = (asignaturaId) => {
    return db.query('SELECT * FROM asignaturas WHERE id=?', [asignaturaId]);
}

const getAllAsignaturas = () => {
    return db.query('SELECT * FROM asignaturas');
}

module.exports = { getAsignaturaById, getAllAsignaturas };