exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user_products")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("user_products").insert([
        { user_id: 1, product_id: 1 },
        { user_id: 1, product_id: 2 },
        { user_id: 1, product_id: 3 },
      ]);
    });
};
