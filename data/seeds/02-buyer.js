exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("buyer")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("buyer").insert([{ name: "anthony" }]);
    });
};
