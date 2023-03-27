import request from 'supertest'
import { app } from '../app'

describe('GET /', function () {
  it('responds with json', async function () {
    const response = await request(app)
      .get('/')
      .set('Accept', 'application/json')

    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual('hello world')
  })
})
