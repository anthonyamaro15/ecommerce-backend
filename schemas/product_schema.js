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

function findProductById(id) {
  return db("product").where({ id }).first();
}

function findAdminProject(id, p_id) {
  return db("product as p")
    .join("user_products as up", "p.id", "up.product_id")
    .where("up.user_id", id)
    .where("p.id", p_id);
}

async function updateProduct(u_id, p_id, changes) {
  const [product] = await findAdminProject(u_id, p_id);
  return db("product as p").where("p.id", product.id).update(changes, "id");
}

function getAll() {
  return db("product");
}

module.exports = {
  add,
  getAll,
  //   addSizes
  updateProduct,
  findAdminProject,
};
