const getPuntuacionMediaByProfesorID = (profesorID) => {
    return db.query('SELECT AVG(ac.puntuacion) AS media FROM clases AS c, alumnos_clases AS ac WHERE c.profesor_id = ? AND c.id = ac.clase_id', [profesorID]);
}

const getMejorOpinionByProfesorID = (profesorID) => {
    return db.query('SELECT ac.opinion FROM clases AS c, alumnos_clases AS ac WHERE c.profesor_id = ? AND c.id = ac.clase_id ORDER BY ac.puntuacion DESC LIMIT 1', [profesorID]);
}

module.exports = { getPuntuacionMediaByProfesorID, getMejorOpinionByProfesorID };