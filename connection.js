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

async function getConnection() {
  try {
    await sql.connect(config);
    console.log('Connected to Azure SQL Database');
    await readData();
  } catch (err) {
    console.error('Failed to connect to Azure SQL Database', err);
  }
}

async function readData() {
  try {
    const result = await sql.query('SELECT * FROM Library_Books');
    console.log(result.recordset);
  } catch (err) {
    console.error('Error querying database:', err);
  }
}

getConnection();
