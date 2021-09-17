const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'MyDB@1234',
  host: 'localhost',
  port: 5432,
  database: 'myapp',
});

module.exports = pool;
