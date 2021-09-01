const helpers = {};
const bcrypt = require('bcryptjs');

helpers.encriptarContraseña = async(clave) => {
    const salt = await bcrypt.genSalt(10);
    const claveEncriptada = await bcrypt.hash(clave, salt);
    return claveEncriptada;
};

helpers.compararContraseña = async(clave, DBclave) => {
    try {
        return await bcrypt.compare(clave, DBclave);
    }
    catch(e) {
        console.log(e);
    }
};

module.exports = helpers;