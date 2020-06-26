exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("product")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("product").insert([
        {
          product_name: "shirt",
          size: "s, m, l",
          price: 10.99,
          image_url: "imageurlhere",
          details: "here are some details for the t-shirt",
          type: "t-shirt",
          category: "men",
          color: "red, blue",
        },
        {
          product_name: "belt",
          size: "s, m, l",
          price: 5.99,
          image_url: "imageurlhere",
          details: "here are some details for the belt",
          type: "accesories",
          category: "men",
          color: "red, blue",
        },
        {
          product_name: "tops & t-shirts",
          size: "s, m, l",
          price: 11.99,
          image_url: "imageurlhere",
          details: "here are some details for the tops & t-shirts",
          type: "t-shirt",
          category: "women",
          color: "red, blue",
        },
      ]);
    });
};
