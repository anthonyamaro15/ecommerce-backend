exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("product_color")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("product_color").insert([
        { p_color: "red", product_id: 1 },
        { p_color: "blue", product_id: 1 },
        { p_color: "white", product_id: 1 },
        { p_color: "pink", product_id: 1 },
        { p_color: "purple", product_id: 1 },

        { p_color: "red", product_id: 2 },
        { p_color: "blue", product_id: 2 },
        { p_color: "white", product_id: 2 },
        { p_color: "pink", product_id: 2 },
        { p_color: "purlple", product_id: 2 },

        { p_color: "red", product_id: 3 },
        { p_color: "blue", product_id: 3 },
        { p_color: "white", product_id: 3 },
        { p_color: "pink", product_id: 3 },
        { p_color: "purple", product_id: 3 },
      ]);
    });
};
