exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("client")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("client").insert([
        { product_id: 1, quantity: 1 },
        { product_id: 2, quantity: 1 },
        { product_id: 3, quantity: 3 },
      ]);
    });
};
