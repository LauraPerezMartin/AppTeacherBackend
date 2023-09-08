const getProfesoresPublic = () => {
    return db.query('SELECT u.id, u.nombre, u.apellidos, u.direccion, u.ciudad, u.latitud, u.longitud, u.imagen, p.experiencia, p.precio FROM usuarios AS u, profesores AS p WHERE u.rol="profe" AND u.id=p.usuario_id AND p.validado=1;');
}

module.exports = { getProfesoresPublic };
