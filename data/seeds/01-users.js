exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          first_name: "jon",
          last_name: "smith",
          email: "jon@example.com",
          password: "jon123",
          resetLink: "",
        },
      ]);
    });
};
