const request = require('supertest')
const buildApp = require('../../app')
const UserRepo = require('../../repos/user-repo')

it('create a user', async () => {
    const startingCount = await UserRepo.count()
    expect(startingCount).toEqual(0)
    await request(buildApp())
    .post('/user')
    .send({
        username: 'testuser', 
        bio: 'test bio'
    }).expect(200);

    const finnishCount = await UserRepo.count()
    expect(finnishCount).toEqual(1)
})