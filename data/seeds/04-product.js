exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("product")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("product").insert([
        {
          product_name: "shirt",
          price: 10.99,
          image_url: "imageurlhere",
          details: "here are some details for the t-shirt",
          type: "t-shirt",
          category: "men",
        },
        {
          product_name: "belt",
          price: 5.99,
          image_url: "imageurlhere",
          details: "here are some details for the belt",
          type: "accesories",
          category: "men",
        },
        {
          product_name: "tops & t-shirts",
          price: 11.99,
          image_url: "imageurlhere",
          details: "here are some details for the tops & t-shirts",
          type: "t-shirt",
          category: "women",
        },
      ]);
    });
};
