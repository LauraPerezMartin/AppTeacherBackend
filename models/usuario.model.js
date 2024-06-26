const getUsuarioById = (usuarioId) => {
    return db.query('SELECT * FROM usuarios WHERE id=?', [usuarioId]);
}

const getUsuarioByMail = (email) => {
    return db.query('SELECT * FROM usuarios WHERE email=?', [email]);
};

const getUsuariosByRol = (rol) => {
    return db.query('SELECT * FROM ususario WHERE rol=?', [rol]);
}

const create = ({ nombre, apellidos, username, email, password, telefono, direccion, ciudad, latitud, longitud, imagen, edad, fecha_nacimiento, genero, dni, rol }) => {
    return db.query(
        'INSERT INTO usuarios (nombre, apellidos, username, email, password, telefono, direccion, ciudad, latitud, longitud, imagen, edad, fecha_nacimiento, genero, dni, rol) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [nombre, apellidos, username, email, password, telefono, direccion, ciudad, latitud, longitud, imagen, edad, fecha_nacimiento, genero, dni, rol]);
}

const update = (usuarioId, { nombre, apellidos, username, telefono, direccion, ciudad, latitud, longitud, imagen, edad, fecha_nacimiento, genero }) => {
    return db.query('UPDATE usuarios AS u  SET u.nombre=?, u.apellidos=?, u.username=?, u.telefono=?, u.direccion=?, u.ciudad=?, u.latitud=?, u.longitud=?, u.imagen=?, u.edad=?, u.fecha_nacimiento=?, u.genero=? WHERE u.id=?', [nombre, apellidos, username, telefono, direccion, ciudad, latitud, longitud, imagen, edad, fecha_nacimiento, genero, usuarioId]);
}

const deleteById = (usuarioId) => {
    return db.query('UPDATE usuarios SET borrado=1 WHERE id=?', [usuarioId]);
}

module.exports = { getUsuarioById, getUsuarioByMail, getUsuariosByRol, create, update, deleteById };