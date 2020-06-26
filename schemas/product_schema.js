const db = require("../data/config-db");
const { findById } = require("./auth_schema");

async function add(body, u_id) {
  const [id] = await db("product").insert(body, "id");

  const product_id = id;
  const { id: user_id } = await findById(u_id);

  const userProduct = { user_id, product_id };
  return db("user_products").insert(userProduct, "id");
}

// function addSizes(body, product_id) {
//    const newObj = {...body, product_id};
//    return db('product_sizes').insert(newObj, 'id');
// }

function getAll() {
  return db("product");
}

module.exports = {
  add,
  getAll,
  //   addSizes
};
