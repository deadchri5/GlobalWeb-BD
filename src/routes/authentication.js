const express = require('express');
const router = express.Router();

const db = require('../database');
const helpers = require('../lib/helpers');

const { body, validationResult } = require('express-validator');

router.post('/registro', [
    body('email', 'Ingrese correo en formato correcto').isEmail(),
    body('nombre', 'Ingrese un nombre correcto').isAlpha('es-ES'),
    body('apellido', 'Ingrese un apellido correcto').isAlpha('es-ES'),
    body('nick', 'El usuario debe tener al menos 2 carácteres').isLength({min:2}),
    body('password', 'No se puede dejar el campo de contraseña vacio')
    .isLength({min: 1}),
], async(req, res) => {
    //obtener los datos del formulario de registro
    const { nombre, apellido, email, nick, password } = req.body;
    const FK_rol = 1;
    const nuevoUsuario = {
        nombre,
        apellido,
        email,
        nick,
        clave: password,
        FK_rol
    }
    //validar datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const validaciones = errors.array();
        return res.status(200).send({
            validaciones: validaciones, 
            message: 'Verifica que los datos sean correctos.',
            status: 'error'});
      }
    //Verificar que email y usuario no existan
    const existEmail = await db.query('SELECT email FROM usuarios WHERE email = "' + email + '"');
    const existsUser = await db.query('SELECT nick FROM usuarios WHERE nick = "' + nick + '"');
    if (typeof existEmail[0] === 'undefined' && typeof existsUser[0] === 'undefined') {
        //cifrar la contraseña
        nuevoUsuario.clave = await helpers.encriptarContraseña(password);
        //guardar en base de datos
        await db.query('INSERT INTO usuarios SET ?', [nuevoUsuario]);
        return res.status(200).send({
            message: "Registro correcto",
            nombre: nombre,
            status: 'ok'
        })
    }
    else {
        if (typeof existEmail[0] != 'undefined') {
            return res.status(200).send({
                message: `El correo ${email} ya esta registrado.`,
                status: 'error'
            });
        }
        if (typeof existsUser[0] != 'undefined') {
            return res.status(200).send({
                message: `El nombre de usuario "${nick}" ya esta en uso.`,
                status: 'error'
            });
        }
    }
});

router.post('/login', [
    body('nick', 'El usuario debe contener al menos 2 caracteres').isLength({min: 2}),
    body('password', 'La contraseña no puede quedar vacía.').isLength({min: 1}),
],async (req, res) => {
    //Validar los datos que el usuaio envia desde el login
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const validaciones = errors.array();
        return res.status(400).send({
            validaciones: validaciones[0],
            message: validaciones[0].msg,
            status: 'error'
        });
      }
    const { nick, password } = req.body;
    //Comprobar que usuario existe
    const rows = await db.query('SELECT * FROM usuarios WHERE nick = ?', [nick]);
    if (rows.length > 0) {
        const user = rows[0];
        //Comprobar que la contraseña es correcta
        const validaContraseña = await helpers.compararContraseña(password, user.clave);
        if (validaContraseña) {
            req.session.usuario = {
                usuario: user.nick,
                correo: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                permiso: user.FK_rol
            }
            return res.status(200).send({
                message: `Bienvenido/a ${user.nombre}`,
                status: 'success'
            });
        } else {
            return res.status(400).send({
                message: 'La contraseña no es correcta',
                status: 'error'
            });
        }
    } else {
        return res.status(400).send({
            message: 'El usuario no existe.',
            status: 'error'
        });
    }
});

router.get('/sessionInfo', (req, res) => {
    const cookie = req.session;
    if (typeof(cookie.usuario) !== 'undefined') {
        return res.status(200).send({
            payload: cookie.usuario
        });
    } else {
        return res.status(400).send({
            message: 'No te has autenticado.',
            status: 'error'
        });
    }
});

router.delete('/sessionRemove', (req, res) => {
    const cookie = req.session;
    if (typeof(cookie.usuario) !== 'undefined') {
        req.session.destroy(() => {
            return res.status(200).send({
                message: 'se ha eliminado la sesión',
                status: 'success'
            });
        });
    } else {
        return res.status(400).send({
            message: 'No hay sesiones que borrar',
            status: 'error'
        });
    }
})

module.exports = router;