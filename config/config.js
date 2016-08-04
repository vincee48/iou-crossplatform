require('dotenv').config({ path: './.env', silent: true });

console.log('*** STARTING MIGRATION ***');

module.exports = {
  "username": process.env.POSTGRES_USER,
  "password": process.env.POSTGRES_PASSWORD,
  "database": process.env.POSTGRES_DB,
  "host": process.env.DB_HOST,
  "dialect": "postgres"
};