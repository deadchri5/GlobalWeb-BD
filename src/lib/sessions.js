const mysql = require("mysql");
const { database } = require("../keys");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const pool = mysql.createPool(database);
const sessionStore = new MySQLStore(database, pool);

module.exports = sessionStore;