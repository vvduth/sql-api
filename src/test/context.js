const { randomBytes } = require("crypto");
const format = require("pg-format");
const { default: migrate } = require("node-pg-migrate");
const pool = require("../pool");

class Context {
  static async build() {
    // randomly generate a user name to connect to pg
    const roleName = "a" + randomBytes(4).toString("hex");

    // connect to pg
    await pool.connect({
      user: "postgres",
      password: "admin",
      database: "social",
      host: "localhost",
      port: 5432,
    });

    // create a new role with that name
    await pool.query(`
      create role ${roleName} with login password '${roleName}';
    `);
    // creeate schema with the same name
    await pool.query(`
      create schema ${roleName} authorization ${roleName};
    `);

    // disconnect from pg
    await pool.close();

    // run migration inside the schema
    await migrate({
      schema: roleName,
      direction: "up",
      log: () => {},
      noLock: true,
      dir: "migrations",
      databaseUrl: {
        user: roleName,
        password: roleName,
        database: "social",
        host: "localhost",
        port: 5432,
      },
    });

    // coonet to pg as newly created role-
    await pool.connect({
      user: roleName,
      password: roleName,
      database: "social",
      host: "localhost",
      port: 5432,
    });

    return new Context(roleName);
  }

  constructor(roleName) {
    this.roleName = roleName;
  }

  async close() {
    // disconnet form pg as the role
    await pool.close();
    console.log("closed call in conext")
    // reconnect as root user
    await pool.connect({
      user: "postgres",
      password: "admin",
      database: "social",
      host: "localhost",
      port: 5432,
    });

    // delet the rol and the schema we crated
    
     await pool.query(format('DROP SCHEMA %I CASCADE;', this.roleName));
     await pool.query(format('DROP ROLE %I;', this.roleName));
 

    // disconnet
    await pool.close()

  }
}

module.exports = Context;
