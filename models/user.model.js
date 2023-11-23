const getUsuarioById = (usuarioId) => {
    return db.query('SELECT * FROM usuarios WHERE id=?', [usuarioId]);
}

const getUsuarioByMail = (email) => {
    return db.query('SELECT * FROM usuarios WHERE email=?', [email]);
};

const create = ({ nombre, apellidos, username, email, password, telefono, direccion, ciudad, latitud, longitud, imagen, edad, fecha_nacimiento, genero, dni, rol }) => {
    return db.query(
        'INSERT INTO usuarios (nombre, apellidos, username, email, password, telefono, direccion, ciudad, latitud, longitud, imagen, edad, fecha_nacimiento, genero, dni, rol) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [nombre, apellidos, username, email, password, telefono, direccion, ciudad, latitud, longitud, imagen, edad, fecha_nacimiento, genero, dni, rol]);
}

module.exports = { getUsuarioById, getUsuarioByMail, create };