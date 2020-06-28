exports.up = function (knex) {
  return (
    knex.schema
      .createTable("users", (table) => {
        table.increments();
        table.string("first_name", 255).notNullable();
        table.string("last_name", 255).notNullable();
        table.string("email", 255).notNullable().unique();
        table.string("password", 255).notNullable();
      })
      // buyer table
      .createTable("buyer", (table) => {
        table.increments();
        table.string("name", 255).notNullable();
      })
      // comments table
      .createTable("comments", (table) => {
        table.increments();
        table.string("comment", 255);
      })
      // product table
      .createTable("product", (table) => {
        table.increments();
        table.string("product_name", 255).notNullable();
        table.string("size", 255).notNullable();
        table.float("price").notNullable();
        table.string("image_url", 255).notNullable();
        table.string("details", 255).notNullable();
        table.string("type", 255).notNullable();
        table.string("category", 255).notNullable();
        table.string("color", 255).notNullable();
      })
      // product_sizes table
      // .createTable("product_sizes", (table) => {
      //   table.increments();
      //   table.string("p_size", 255);
      //   table
      //     .integer("product_id")
      //     .unsigned()
      //     .notNullable()
      //     .references("product.id")
      //     .onUpdate("CASCADE")
      //     .onDelete("CASCADE");
      // })
      // product_color
      // .createTable("product_color", (table) => {
      //   table.increments();
      //   table.string("p_color", 255);
      //   table
      //     .integer("product_id")
      //     .unsigned()
      //     .notNullable()
      //     .references("product.id")
      //     .onUpdate("CASCADE")
      //     .onDelete("CASCADE");
      // })
      // user_products
      .createTable("user_products", (table) => {
        table.increments("user_product_id");
        table
          .integer("user_id")
          .unsigned()
          .notNullable()
          .references("users.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .integer("product_id")
          .unsigned()
          .notNullable()
          .references("product.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })
      // product_comments table
      .createTable("product_comments", (table) => {
        table.increments("product_comment_id");
        table
          .integer("product_id")
          .unsigned()
          .notNullable()
          .references("product.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .integer("comment_id")
          .unsigned()
          .notNullable()
          .references("comments.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .integer("buyer_id")
          .unsigned()
          .notNullable()
          .references("buyer.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })

      // client table
      .createTable("client", (table) => {
        table.increments();
        table.integer("quantity").notNullable();
        table
          .integer("product_id")
          .unsigned()
          .notNullable()
          .references("product.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })
  );
};

exports.down = function (knex) {
  return (
    knex.schema
      .dropTableIfExists("product_comments")
      .dropTableIfExists("user_products")
      //  .dropTableIfExists("product_color")
      //  .dropTableIfExists("product_sizes")
      .dropTableIfExists("product")
      .dropTableIfExists("comments")
      .dropTableIfExists("buyer")
      .dropTableIfExists("users")
  );
};

// 05
// exports.seed = function (knex) {
//   // Deletes ALL existing entries
//   return knex("product_sizes")
//     .truncate()
//     .then(function () {
//       // Inserts seed entries
//       return knex("product_sizes").insert([
//         { p_size: "medium", product_id: 1 },
//         { p_size: "small", product_id: 1 },
//         { p_size: "large", product_id: 1 },
//         { p_size: "small", product_id: 2 },
//         { p_size: "medium", product_id: 2 },
//         { p_size: "large", product_id: 2 },
//         { p_size: "small", product_id: 3 },
//         { p_size: "medium", product_id: 3 },
//         { p_size: "large", product_id: 3 },
//       ]);
//     });
// };

//06
// exports.seed = function (knex) {
//   // Deletes ALL existing entries
//   return knex("product_color")
//     .truncate()
//     .then(function () {
//       // Inserts seed entries
//       return knex("product_color").insert([
//         { p_color: "red", product_id: 1 },
//         { p_color: "blue", product_id: 1 },
//         { p_color: "white", product_id: 1 },
//         { p_color: "pink", product_id: 1 },
//         { p_color: "purple", product_id: 1 },

//         { p_color: "red", product_id: 2 },
//         { p_color: "blue", product_id: 2 },
//         { p_color: "white", product_id: 2 },
//         { p_color: "pink", product_id: 2 },
//         { p_color: "purlple", product_id: 2 },

//         { p_color: "red", product_id: 3 },
//         { p_color: "blue", product_id: 3 },
//         { p_color: "white", product_id: 3 },
//         { p_color: "pink", product_id: 3 },
//         { p_color: "purple", product_id: 3 },
//       ]);
//     });
// };
