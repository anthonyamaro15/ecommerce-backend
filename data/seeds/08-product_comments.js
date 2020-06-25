exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("product_comments")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("product_comments").insert([
        { product_id: 1, comment_id: 1, buyer_id: 1 },
      ]);
    });
};
