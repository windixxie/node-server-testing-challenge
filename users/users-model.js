const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  remove,
  getAll,
  findById,
};

async function insert(user) {
  return db('users').insert(user, 'id').then(ids => findById(ids[0]));
}

function remove(id) {
  return db('users').where('id', id).del();
}

function getAll() {
  return db('users');
}

function findById(id) {
  return db('users').where('id', id);
}