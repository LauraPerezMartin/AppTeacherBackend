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

const update = (usuarioId, { nombre, apellidos, username, telefono, direccion, ciudad, latitud, longitud, imagen, edad, fecha_nacimiento, genero, experiencia, precio }) => {
    return db.query('UPDATE usuarios AS u, profesores AS p SET u.nombre=?, u.apellidos=?, u.username=?, u.telefono=?, u.direccion=?, u.ciudad=?, u.latitud=?, u.longitud=?, u.imagen=?, u.edad=?, u.fecha_nacimiento=?, u.genero=?, p.experiencia=?, p.precio=? WHERE u.id=? AND p.usuario_id = u.id;', [nombre, apellidos, username, telefono, direccion, ciudad, latitud, longitud, imagen, edad, fecha_nacimiento, genero, experiencia, precio, usuarioId]);
}

const updateValidacion = (usuarioId, validacion) => {
    return db.query('UPDATE profesores SET validado=? WHERE usuario_id=?', [validacion, usuarioId]);
}

const create = (usuarioId, { experiencia, precio }) => {
    return db.query('INSERT INTO profesores (experiencia, precio, usuario_id)  VALUES (?, ?, ?)', [experiencia, precio, usuarioId]);
}

module.exports = { getProfesoresPublic, getAllProfesores, getCiudadesConProfesores, getProfesorByUsuarioId, update, updateValidacion, create };
