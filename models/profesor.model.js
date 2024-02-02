const getProfesoresPublic = () => {
    return db.query('SELECT u.id, u.nombre, u.apellidos, u.direccion, u.ciudad, u.latitud, u.longitud, u.imagen, p.experiencia, p.precio FROM usuarios AS u, profesores AS p WHERE u.rol="profe" AND u.id=p.usuario_id AND p.validado=1 AND u.borrado=0');
}

const getCiudadesConProfesores = () => {
    return db.query('SELECT DISTINCT ciudad FROM usuarios AS u, profesores AS p WHERE rol="profe" AND u.id=p.usuario_id AND p.validado=1 AND u.borrado=0');
}

const getAllProfesores = () => {
    return db.query('SELECT u.*, p.experiencia, p.precio, p.validado FROM usuarios AS u, profesores AS p WHERE u.rol="profe" AND u.id = p.usuario_id');
}

const getProfesorByUsuarioId = (usuarioId) => {
    return db.query('SELECT u.*, p.experiencia, p.precio, p.validado FROM usuarios AS u, profesores AS p WHERE u.id=? and u.rol="profe" AND u.id= p.usuario_id AND u.borrado=0', [usuarioId]);
}

const updateValidacion = (usuarioId, validacion) => {
    return db.query('UPDATE profesores SET validado=? WHERE usuario_id=?', [validacion, usuarioId]);
}

const create = (usuarioId, { experiencia, precio }) => {
    return db.query('INSERT INTO profesores (experiencia, precio, usuario_id)  VALUES (?, ?, ?)', [experiencia, precio, usuarioId]);
}

module.exports = { getProfesoresPublic, getAllProfesores, getCiudadesConProfesores, getProfesorByUsuarioId, updateValidacion, create };
