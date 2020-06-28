const db = require("../data/config-db");
const { findById } = require("./auth_schema");

async function add(body, u_id) {
  const [id] = await db("product").insert(body, "id");

  const product_id = id;
  const { id: user_id } = await findById(u_id);

  const userProduct = { user_id, product_id };
  return db("user_products").insert(userProduct, "id");
}

function findProductById(id) {
  return db("product").where({ id }).first();
}

function findAdminProduct(id, p_id) {
  return db("product as p")
    .join("user_products as up", "p.id", "up.product_id")
    .where("up.user_id", id)
    .where("p.id", p_id);
}

async function updateProduct(u_id, p_id, changes) {
  const [product] = await findAdminProduct(u_id, p_id);
  return db("product as p").where("p.id", product.id).update(changes, "id");
}

async function getProducts() {
  const women = await db("product as p").where("p.category", "women");
  const men = await db("product as p").where("p.category", "men");

  const separateProducts = {
    women,
    men,
  };
  return separateProducts;
}

async function removeProduct(u_id, p_id) {
  const [product] = await findAdminProduct(u_id, p_id);
  return db("product as p").where("p.id", product.id).del();
}

module.exports = {
  add,

  //   addSizes
  updateProduct,
  findProductById,
  findAdminProduct,
  removeProduct,
  getProducts,
};
