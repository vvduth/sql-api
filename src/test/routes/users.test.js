const request = require("supertest");
const buildApp = require("../../app");
const UserRepo = require("../../repos/user-repo");
const Context = require('../context')

let context ;

beforeAll(async () => {
   context = await Context.build()
  
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
    return context.close()
})