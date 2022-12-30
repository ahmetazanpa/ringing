// Import path module
const path = require("path");

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, "db/database.sqlite");

// Create connection to SQLite database
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  useNullAsDefault: true,
});

knex.schema
  .hasTable("users")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("users", (table) => {
          table.increments("id").primary().unique();
          table.string("companyname", 50).notNullable();
          table.string("username", 16).notNullable();
          table.string("email", 75).notNullable();
          table.string("password", 16).notNullable();
          table.timestamps(true, true);
        })
        .then(() => {
          // Log success message
          console.log("Table 'Users' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("users done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });



knex.schema
  .hasTable("programs")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("programs", (table) => {
          table.increments("id").primary().unique();
          table.string("programname", 50).notNullable();
          table.specificType("programday", 'string[]').notNullable();
          table.string("username", 12).notNullable();
          table.foreign("id").references("programdetails.programid");
          table.timestamps(true, true);
        })
        .then(() => {
          // Log success message
          console.log("Table 'Program' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("programs done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });


  knex.schema
  .hasTable("programdetails")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("programdetails", (table) => {
          table.increments("id").primary().unique();
          table.string("lessonname", 50).notNullable();
          table.text("notificationfile").notNullable();
          table.text("starttime").notNullable();
          table.text("endtime").notNullable();
          table.integer("programid").notNullable();
          table.timestamps(true, true);
        })
        .then(() => {
          // Log success message
          console.log("Table 'Program Details' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("program details done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

// Just for debugging purposes:
// Log all data in "users" table
// knex
//   .select("*")
//   .from("users")
//   .then((data) => console.log("data:", data))
//   .catch((err) => console.log(err));


// Export the database
module.exports = knex;
