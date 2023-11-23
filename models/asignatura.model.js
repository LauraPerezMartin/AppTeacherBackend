const getAsignaturaById = (asignaturaId) => {
    return db.query('SELECT * FROM asignaturas WHERE id=?', [asignaturaId]);
}

module.exports = { getAsignaturaById };