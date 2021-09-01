const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({
  uploadDir: 'src/upload/images'
});

const db = require("../database");

router.get("/obtenerCatalogo", async (req, res) => {
  //obtener parametros de busqueda
  var productos;
  const { busqueda, categoria } = req.query;
  //Si hay busqueda
  if (typeof busqueda !== "undefined" && busqueda !== null) {
    productos = await db.query(
      `SELECT ID, nombre, marca, precio, descripcion, imagen FROM productos WHERE nombre LIKE "%${busqueda}%" OR descripcion LIKE "%${busqueda}%" OR marca LIKE "%${busqueda}%"`
    );
    return res.status(200).send({
      productos,
    });
  }
    //Si hay categoria
    if (typeof categoria !== "undefined" && categoria !== null) {
        productos = await db.query(
          `SELECT ID, nombre, marca, precio, descripcion, imagen FROM productos WHERE FK_categoria = "${categoria}"`
        );
        return res.status(200).send({
          productos,
        });
      }
  //Si no hay parametros
  productos = await db.query(
    "SELECT ID, nombre, marca, precio, descripcion, imagen FROM productos"
  );
  return res.status(200).send({
    productos,
  });
});

router.get('/productImage/:image', (req, res) => {
  const file = req.params.image;
  const pathFile = `src/upload/images/${file}`;
  fs.stat(pathFile, error => {
    if (!error) {
      return res.status(200).sendFile(path.resolve(pathFile));
    } else {
      return res.status(400).send({
        message: 'No se encontro el fichero en el servidor.',
        status: 'error'
      });
    }
  })
});

router.post('/uploadProduct', multipartMiddleware, (req, res) => {
  //recojer los datos
  const { nombre, marca, precio, descripcion, categoria } = req.body;
  const image = req.files.file0;

  const nuevoProducto = {
    nombre,
    marca,
    precio,
    descripcion,
    imagen: null,
    FK_categoria: categoria
  }

  //verificar que hay imagen
  if (image) {
    //Agregar producto con imagen
    const { path } = image;
    var pathSplited = path.split('/');
    const fileName = pathSplited[3];
    var extensions = fileName.split('.');
    const fileExtension = extensions[1];
    if (fileExtension == 'jpg' || fileExtension == 'png' || fileExtension == 'jpeg') {
      //Agregar producto con imagen
      nuevoProducto.imagen = fileName;
      db.query('INSERT INTO productos SET ?', [nuevoProducto]);
      return res.status(200).send({
        message: `Producto ${nombre} agregado con exito al catalogo.`,
        note: 'El produto se agrego con imágen.',
        status: 'success'
      });
    } else {
      //Borro el archivo en mal formato
      try{
        fs.unlinkSync(path);
        return res.status(400).send({
          message: `No se agrego el producto ${nombre}.`,
          note: `La extensión ${fileExtension} no es permitida`,
          status: 'error'
        });
      }
      catch(err){
        throw err;
      };
    }
  } else {
    //Agregar producto sin imagen
    db.query('INSERT INTO productos SET ?', [nuevoProducto]);
    return res.status(200).send({
      message: `Producto ${nombre} agregado con exito al catalogo.`,
      note: 'El produto no cuenta con imágen.',
      status: 'success'
    });
  }
});

router.post('/addToCart', async (req, res) => {
  const { ID } = req.body
  const { usuario } = req.session;
  const query = await db.query('SELECT ID from usuarios WHERE nick = ?', [usuario.usuario]);
  const userID = query[0].ID;

  if (typeof(ID) !== 'undefined' && typeof(userID) !== 'undefined') {
    //comprobar que no existe producto en carrito de usuario
    const row = await db.query(`SELECT cantidad FROM compra where FK_usuario = ${userID} AND FK_producto = ${ID}`);
    if (row.length > 0) {
      //Si la consulta tiene valor incrementar cantidad a valor en carrito
      await db.query(`UPDATE compra SET cantidad = ${row[0].cantidad+1} WHERE FK_usuario = ${userID} AND FK_producto = ${ID}`)
      return res.status(200).send({
        message: 'Se ha actualizado la cantidad de elementos agregados al carrito.',
        status: 'sucess'
      });
    } else {
      //Si la consulta no da ningun valor agregar a carrito
      await db.query(`INSERT INTO compra (FK_usuario, FK_producto, cantidad) VALUES (${userID}, ${ID}, ${1})`);
      return res.status(200).send({
        message: 'Se ha agregado con exito al carrito de compras.',
        status: 'sucess'
      });
    }
    
  } else {
    return res.status(400).send({
      message: 'Ocurrio un error al agregar al carrito.',
      status: 'error'
    });
  }
});

router.get('/getShoppingCart', async (req, res) => {
  const { usuario } = req.session;
  const query = await db.query('SELECT ID from usuarios WHERE nick = ?', [usuario.usuario]);
  const userID = query[0].ID;

  if (typeof(userID) !== 'undefined') {
    const carrito = await db.query(`SELECT productos.ID, productos.nombre, productos.precio, cantidad FROM compra INNER JOIN productos ON compra.FK_producto = productos.ID WHERE compra.FK_usuario = ${userID}`);
    if (carrito.length > 0) {
      return res.status(200).send({
        productos: carrito,
        message: 'Se encontraron productos en el carrito del usuario.',
        status: 'success',
      });
    } else {
      return res.status(200).send({
        message: 'El carrito está vacio',
        status: 'success',
      });
    }
  } else {
    return res.status(400).send({
      message: 'El usuario no existe en la base de datos.',
      status: 'error',
    });
  }
});

router.delete('/deleteFromCArt/:id', async(req, res) => {
  const { usuario } = req.session;
  const { id } = req.params;
  const query = await db.query('SELECT ID from usuarios WHERE nick = ?', [usuario.usuario]);
  const userID = query[0].ID;
  try {
    await db.query(`DELETE FROM compra WHERE FK_usuario = ${userID} AND FK_producto = ${id}`);
    return res.status(200).send({
      message: 'Se borro el elemento del carrito de compras.',
      status: 'success'
    });
  }
  catch(e) {
    return res.status(400).send({
      error: e,
      message: 'No se pudo eliminar producto del carrito de compras.',
      status: 'success'
    });
  }
});

router.get('/getAddress', async (req, res) => {
  const { usuario } = req.session;
  const FkDireccion = await db.query('SELECT FK_direccion FROM usuarios WHERE nick = ?', [usuario.usuario]);
  const rows = await db.query('SELECT * FROM direcciones WHERE ID = ?', [FkDireccion[0].FK_direccion]);
  if (rows.length > 0) {
    const direccion = rows[0];
    return res.status(200).send({
      direccion,
      message: 'Se encontro la dirección del usuario de manera correcta',
      status: 'success'
    });
  } else {
    res.status(200).send({
      message: 'EL usuario no tiene direcciones registradas',
      status: 'incomplete'
    });
  }
});

router.get('/getComments', async (req, res) => {
  const comments = await db.query('SELECT * FROM foro');
  if (comments.length > 0) {
    return res.status(200).send({
      comments,
      message: 'Comentarios de la comunidad',
      status: 'success'
    });
  } else {
    return res.status(200).send({
      message: 'No hay comentarios que listar',
      status: 'error'
    });
  }
});

router.post('/postComment', async(req, res) => {
  const { nombre, apellido, correo, comentario } = req.body;

  try {
    console.log(`INSERT INTO foro (nombre, apellido, correo, comentario) VALUES ('${nombre}', '${apellido}', '${correo}', '${comentario}')`);
    db.query(`INSERT INTO foro (nombre, apellido, correo, comentario) VALUES ('${nombre}', '${apellido}', '${correo}', '${comentario}')`);
    res.status(200).send({
      message: 'Comentario publicado',
      status: 'success'
    });
  }
  catch(e) {
    res.status(400).send({
      error: e,
      message: 'Error al publicar comentario',
      status: 'error'
    });
  }
});

module.exports = router;
