const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
  findHubMessages,
  findMessageById,
  addMessage,
  insert,
  insertMessage
};

function find(query) {
  // const { page = 1, limit = 2, sortby = 'id', sortdir = 'asc' } = query;
  // const offset = limit * (page - 1);

  let rows = db('hubs');
    // .orderBy(sortby, sortdir)
    // .limit(limit)
    // .offset(offset);

  return rows;
}

function findById(id) {
  return db('hubs')
    .where({ id })
    .first();
}

function insert(hub) {
  return db('hubs').insert(hub).then(([id]) => id);
}

async function add(hub) {
  const [id] = await db('hubs').insert(hub);

  return findById(id);
}

function remove(id) {
  return db('hubs')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('hubs')
    .where({ id })
    .update(changes, '*');
}

function findHubMessages(hubId) {
  return db('messages as m')
    .join('hubs as h', 'm.hub_id', 'h.id')
    .select('m.id', 'm.text', 'm.sender', 'h.id as hubId', 'h.name as hub')
    .where({ hub_id: hubId });
}

// You Do
function findMessageById(id) {
  return db('messages')
    .where({ id })
    .first();
}

function insertMessage(message) {
  return db('messages').insert(message).then(([id]) => id);
}

async function addMessage(message) {
  const [id] = await db('messages').insert(message);

  return findMessageById(id);
}
