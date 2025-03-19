const pool = require("../pool");
const tocamelcamse = require('./utils/to-camel-case')
class UserRepo {
  static async find() {
    const { rows } = await pool.query("select * from users;");

   
    return tocamelcamse(rows);
  }
  static async findById() {}
  static async insert() {}
  static async update() {}

  static async delete() {}
}

module.exports = UserRepo;
