exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("product_sizes")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("product_sizes").insert([
        { p_size: "medium", product_id: 1 },
        { p_size: "small", product_id: 1 },
        { p_size: "large", product_id: 1 },
        { p_size: "small", product_id: 2 },
        { p_size: "medium", product_id: 2 },
        { p_size: "large", product_id: 2 },
        { p_size: "small", product_id: 3 },
        { p_size: "medium", product_id: 3 },
        { p_size: "large", product_id: 3 },
      ]);
    });
};
