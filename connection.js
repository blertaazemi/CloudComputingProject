const sql = require('mssql');

const config = {
  user: 'blerta',
  password: 'librari2024/',
  server: 'librarymanagementsystem.database.windows.net',
  database: 'Library',
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

let pool;

async function getConnection() {
  if (!pool) {
    pool = await sql.connect(config);
    console.log('Connected to Azure SQL Database');
  }
  return pool;
}

getConnection();

module.exports = { getConnection, sql };
