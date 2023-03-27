import { app } from './app'

const port = 8000

app.listen(port, () => {
  console.log(`⚡️ server is running at http://localhost:${port}`)
})
