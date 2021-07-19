const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')


beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('users').truncate()
  
})
afterAll(async () => {
  await db.destroy()
})

// Write your tests here
// This test will always fail.
test('sanity', () => {
  expect(true).toBe(false)
})

describe('[POST] /auth', () => {
  it('returns a status 201 CREATED', async () => {
    const res = await request(server).post('/api/auth/register').send({ username: 'carnage',password:"foobar" })
    expect(res.status).toBe(201)
  })
  it('returns newly created user', async () => {
    const res = await request(server).post('/api/auth/register').send({ username: 'carnage',password: "foobar" })
    
    expect(res.body).toMatchObject( { username: 'carnage'} )
  })

  it('returns a status 200 Ok upon login',async ()=>{
    const newuserRes = await request(server).post('/api/auth/register').send({ username: 'carnage',password: "foobar" })
    const loginRes = await request(server).post('/api/auth/login').send(newuserRes.body)
    expect(loginRes.status).toBe(200)

  })
  it('returns the username after login',async ()=>{
    const newuserRes = await request(server).post('/api/auth/register').send({ username: 'carnage',password: "foobar" })
    const loginRes = await request(server).post('/api/auth/login').send(newuserRes.body)
    expect(loginRes.body.message).toEqual("welcome back carnage !")

  })
})

