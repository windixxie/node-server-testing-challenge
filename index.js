require('dotenv').config();

const server = require('./api/server.js');

const port = process.env.PORT || 5000;
console.log('db env', process.env.DB_ENVS);
server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));