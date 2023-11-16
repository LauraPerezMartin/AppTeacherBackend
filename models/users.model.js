const getUsuarioByMail = (email) => {
    return db.query('SELECT * FROM usuarios WHERE email=?', [email]);
};

module.exports = { getUsuarioByMail };