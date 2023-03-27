import express, { type Express, type Request, type Response } from 'express'
import cors from 'cors'
import { getOrderedDrivers, overtake } from './driversData'

const app: Express = express()

app.use(cors())

app.use('/static', express.static('static'))

app.get('/api/drivers/', (_req: Request, res: Response) => {
  res.json(getOrderedDrivers())
})

app.post('/api/drivers/:driverId(\\d+)/overtake', (req: Request, res: Response) => {
  const driverId = parseInt(req.params.driverId)
  try {
    overtake(driverId)
    res.json(getOrderedDrivers())
  } catch (err: any) {
    console.error(err.stack)
    res.status(400).json({ error: err.message })
  }
})

export { app }
