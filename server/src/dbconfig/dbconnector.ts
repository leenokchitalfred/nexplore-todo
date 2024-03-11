import { Pool } from 'pg'

export default new Pool({
  max: 10,
  // host: 'db',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  idleTimeoutMillis: 30000,
})
