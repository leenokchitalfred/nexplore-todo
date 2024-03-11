import express, { type Application, type Request, type Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import todosRouter from './routers/TodosRouter'
import pool from './dbconfig/dbconnector'

const corsOptions = {
  origin: ['http://www.example.com', 'http://localhost:3001'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
}

class ExpressServer {
  public readonly app: Application

  constructor() {
    this.app = express()
    this.app.use(cors(corsOptions))
    this.config()
    this.routerConfig()
    this.dbConnect()

    this.app.get('/', (req: Request, res: Response) => {
      res.send('Express + TypeScript Server')
    })
  }

  private config(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json({ limit: '1mb' })) // 100kb default
  }

  private dbConnect(): void {
    pool.connect(function (err, client, done) {
      if (err) throw new Error(err?.message)
      console.log('Connected')
    })
  }

  private routerConfig(): void {
    this.app.use('/todos', todosRouter)
  }

  public start = async (port: number): Promise<number> => {
    return await new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port)
        })
        .on('error', (err: any) => {
          reject(err)
        })
    })
  }

  public getApp = (): Application => {
    return this.app
  }
}

export default ExpressServer
