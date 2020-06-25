const db = require("../data/config-db");

function add(user) {
  return db("users").insert(user, "id");
}

function findById(id) {
  return db("users").where({ id });
}

function findBy(filter) {
  return db("users").where(filter);
}

function updateUser(id, changes) {
  return db("users").where({ id }).update(changes);
}

function deleteUser(id) {
  return db("users").where({ id }).del();
}

module.exports = {
  add,
  findById,
  findBy,
  updateUser,
  deleteUser,
};
