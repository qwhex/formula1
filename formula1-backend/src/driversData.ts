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
export const getOrderedDrivers = (): Driver[] =>
  driverOrder.map((id) => driversById.get(id)).filter((item): item is Driver => item !== undefined)

// "db logic" for "overtake"
export const overtake = (driverId: number): void => {
  const driverPosition = driverOrder.findIndex(val => val === driverId)
  if (driverPosition === -1) {
    throw Error("Driver doesn't exist")
  }
  _overtake(driverOrder, driverPosition)
}

const _overtake = (array: any[], position: number): void => {
  // generic overtake function
  if (position <= 0) {
    throw Error("The first one can't overtake anyone")
  }
  const overtaker = array[position]
  const overtaken = array[position - 1]

  array[position] = overtaken
  array[position - 1] = overtaker
}
