import app from './app'
import { createConnection } from 'typeorm'

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

createConnection().then(connection => {
  console.log('Database migrated')
}).catch(error => console.log(error))
