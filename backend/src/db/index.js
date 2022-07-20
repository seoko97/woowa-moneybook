const mysql = require('mysql2/promise');
const ENVIRONMENTS = require('../constant/environments');

const pool = mysql.createPool({
	port: ENVIRONMENTS.DATABASE_PORT ?? 3000,
	host: ENVIRONMENTS.DATABASE_HOST,
	user: ENVIRONMENTS.DATABASE_USERNAME,
	password: ENVIRONMENTS.DATABASE_PASSWORD,
	database: ENVIRONMENTS.DATABASE_NAME,
});

module.exports = pool;
