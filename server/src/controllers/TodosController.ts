import pool from '../dbconfig/dbconnector'
import { type Request, type Response } from 'express'

export interface Duty {
  id: string
  name: string
  lastUpdateTime: string
}

class TodosController {
  public get = async (req: Request, res: Response): Promise<void> => {
    try {
      const client = await pool.connect()

      const sql =
        'SELECT id::text, name, lastUpdateTime FROM todos ORDER BY lastUpdateTime ASC'
      const { rows } = await client.query<Duty>(sql)
      const todos = rows

      client.release()

      res.status(200).send(todos)
    } catch (error) {
      res.status(400).send(error)
    }
  }

  public add = async (req: Request, res: Response): Promise<Response> => {
    try {
      const dutyname: string = req.body.dutyname
      if (!dutyname || dutyname.trim().length === 0) {
        throw Error('Invalid input')
      }
      console.log('dutynames', req.body)
      const client = await pool.connect()

      const sql =
        'INSERT INTO todos (name, lastUpdateTime) VALUES ($1, CURRENT_TIMESTAMP) RETURNING id::text, name, lastUpdateTime;'
      const values = [dutyname]

      const { rows } = await client.query<Duty>(sql, values)
      const todos = rows

      client.release()

      return res.status(200).send(todos?.[0])
    } catch (error) {
      const _error = error as Error
      return res.status(400).send(_error.message)
    }
  }

  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = req.params.id?.toString()
      if (!id || id.trim().length === 0) throw Error('Invalid input')
      const client = await pool.connect()

      const sql = 'DELETE FROM todos WHERE id = $1;'
      const values = [id]

      const { rows } = await client.query(sql, values)
      const todos = rows

      client.release()

      return res.status(200).send(todos)
    } catch (error) {
      const _error = error as Error
      return res.status(400).send(_error.message)
    }
  }
}

export default TodosController
