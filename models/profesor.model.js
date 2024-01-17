const getProfesoresPublic = () => {
    return db.query('SELECT u.id, u.nombre, u.apellidos, u.direccion, u.ciudad, u.latitud, u.longitud, u.imagen, p.experiencia, p.precio FROM usuarios AS u, profesores AS p WHERE u.rol="profe" AND u.id=p.usuario_id AND p.validado=1 AND u.borrado=0');
}

const getAllProfesores = () => {
    return db.query('SELECT u.*, p.experiencia, p.precio FROM usuarios AS u, profesores AS p WHERE u.rol="profe" AND u.id = p.usuario_id AND u.borrado=0');
}

const getCiudadesConProfesores = () => {
    return db.query('SELECT DISTINCT ciudad FROM usuarios WHERE rol="profe" AND p.validado=1 AND u.borrado=0');
}

const getProfesorById = (profesorId) => {
    return db.query('SELECT * FROM profesores WHERE id=?', [profesorId]);
}

const create = (usuarioId, { experiencia, precio }) => {
    return db.query('INSERT INTO profesores (experiencia, precio, usuario_id)  VALUES (?, ?, ?)', [experiencia, precio, usuarioId]);
}
module.exports = { getProfesoresPublic, getAllProfesores, getCiudadesConProfesores, getProfesorById, create };
