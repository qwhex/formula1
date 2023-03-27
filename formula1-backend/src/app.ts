import express, { type Express, type Request, type Response } from 'express'

const app: Express = express()

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'hello world'
  })
})

export { app }
