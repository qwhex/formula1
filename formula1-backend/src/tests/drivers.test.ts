import request from 'supertest'
import { app } from '../app'

const driversPath = '/api/drivers/'

describe('GET /api/drivers/', function () {
  it('responds with correct status', async function () {
    const response = await request(app)
      .get(driversPath)
      .set('Accept', 'application/json')

    expect(response.status).toEqual(200)
  })

  it('responds with correct number of drivers', async function () {
    const response = await request(app)
      .get(driversPath)
      .set('Accept', 'application/json')

    expect(response.body.length).toEqual(21)
  })

  it('responds with a driver with the correct obj keys', async function () {
    // simple sanity check - not for production haha
    const response = await request(app)
      .get(driversPath)
      .set('Accept', 'application/json')

    const actualProps = new Set(Object.keys(response.body[0]))
    const keys = ['id',
      'code',
      'firstname',
      'lastname',
      'country',
      'team',
      'imgUrl',
      'place']

    keys.forEach((key) => expect(actualProps.has(key)))
  })
})

describe('POST /api/drivers/{driverId}/overtake', function () {
  const getPath = (driverId: number | string): string => `/api/drivers/${driverId}/overtake`

  it('responds with correct result for a valid operation', async function () {
    // get the driver at the second place
    const driversResponse = await request(app)
      .get(driversPath)
      .set('Accept', 'application/json')
    const secondDriver = driversResponse.body[1]
    expect(secondDriver.place).toBe(2)

    // tell the backend so he overtook the player before him
    const response = await request(app)
      .post(getPath(secondDriver.id))
      .set('Accept', 'application/json')

    expect(response.status).toEqual(200)
    const newFirstDriver = response.body[0]
    expect(newFirstDriver.id).toEqual(secondDriver.id)
  })

  it('responds with error message for trying to call overtake on the first driver', async function () {
    // get the driver at the second place
    const driversResponse = await request(app)
      .get(driversPath)
      .set('Accept', 'application/json')
    const firstDriver = driversResponse.body[0]
    expect(firstDriver.place).toBe(1)

    // tell the backend that he overtook someone (not possible)
    const response = await request(app)
      .post(getPath(firstDriver.id))
      .set('Accept', 'application/json')

    expect(response.status).toEqual(400)
    expect(response.body.error).toEqual("The first one can't overtake anyone")
  })

  it('responds with error message for calling overtake on non-existent driver', async function () {
    const response = await request(app)
      .post(getPath(123456789))
      .set('Accept', 'application/json')

    expect(response.status).toEqual(400)
    expect(response.body.error).toEqual("Driver doesn't exist")
  })

  it('responds with 404 for non-int driverIds', async function () {
    // ideally these could be tested with fast-check (generatively)
    const response = await request(app)
      .post(getPath('foo'))
      .set('Accept', 'application/json')

    expect(response.status).toEqual(404)
  })
})
