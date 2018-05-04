let { Pool } = require('pg');

let pool = new Pool({
    user: 'user',
    password: 'pass',
    database: 'recipebook'
});

module.exports = {
    query: (text, params, callback) => {return pool.query(text, params, callback)}
};


