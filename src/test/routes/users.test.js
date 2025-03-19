const request = require("supertest");
const buildApp = require("../../app");
const UserRepo = require("../../repos/user-repo");
const pool = require("../../pool");

const {randomBytes  } = require('crypto')
const format = require('pg-format')
const {default: migrate}= require('node-pg-migrate')

beforeAll(async () => {

  // randomly generate a user name to connect to pg
  const roleName = 'a' + randomBytes(4).toString('hex');

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
    `)
  // creeate schema with the same name
  await pool.query(`
      create schema ${roleName} authorization ${roleName};
    `)

  // disconnect from pg
  await pool.close()

  // run migration inside the schema
  await migrate({
    schema: roleName, 
    direction: 'up',
    log: () => {

    },
  })

  // coonet to pg as newly created role-
   
});

it("create a user", async () => {
  const startingCount = await UserRepo.count();
  
  await request(buildApp())
    .post("/users")
    .send({
      username: "testuser",
      bio: "test bio",
    })
    .expect(200);

  const finnishCount = await UserRepo.count();
  expect(Number(finnishCount)).toEqual(Number(startingCount) + 1);
});


afterAll(() => {
    return pool.close()
})