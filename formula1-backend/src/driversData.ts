import { localDrivers } from './data/drivers' // local data
import { shuffle } from 'lodash/fp'

interface Driver {
  id: number // 0
  code: string // 'ALB'
  firstname: string // 'Alexander'
  lastname: string // 'Albon'
  country: string // 'TH'
  team: string // 'Williams'
}

interface DriverResponse extends Driver {
  imgUrl: string // /static/alb.png
  place: number // 1
}

interface LocalDriverData {
  driversById: Map<number, Driver>
  driverOrder: number[]
}

const loadDrivers = (): LocalDriverData => {
  // we do this for the case if the local input order is not corresponding to actual IDs
  const driversById = new Map(
    localDrivers.map(obj => {
      return [obj.id, obj]
    })
  )
  // shuffled driverId list
  const driverOrder = shuffle(localDrivers.map(obj => obj.id))

  return { driversById, driverOrder }
}

// here we have the ugly global variables :)
const { driversById, driverOrder } = loadDrivers()

// "db logic" for "get drivers"
export const getOrderedDrivers = (): DriverResponse[] =>
  driverOrder.map((id) => driversById.get(id))
    .filter((item): item is Driver => item !== undefined)
    .map((d, i) => ({ ...d, imgUrl: `/static/${d.code.toLowerCase()}.png`, place: i + 1 }))

// "db logic" for "overtake"
export const overtake = (driverId: number): void => {
  const driverPosition = driverOrder.findIndex(val => val === driverId)
  if (driverPosition === -1) {
    throw Error("Driver doesn't exist")
  }
  _overtake(driverOrder, driverPosition)
}

// generic overtake function
const _overtake = (array: any[], position: number): void => {
  if (position <= 0) {
    throw Error("The first one can't overtake anyone")
  }
  const overtaker = array[position]
  const overtaken = array[position - 1]

  array[position] = overtaken
  array[position - 1] = overtaker
}
