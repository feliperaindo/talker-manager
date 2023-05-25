const mysql = require('mysql2/promise');

const { constants, ports } = require('../SSOT/exporter');

const config = {
  host: process.env.MYSQL_HOSTNAME || constants.LOCALHOST,
  port: process.env.MYSQL_PORT || ports.DB_PORT,
  user: process.env.MYSQL_USER || constants.USER_DB,
  password: process.env.MYSQL_PASSWORD || constants.PASSWORD_DB,
  database: process.env.MYSQL_DATABASE || constants.NAME_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const connection = () => mysql.createPool(config);

module.exports = connection;