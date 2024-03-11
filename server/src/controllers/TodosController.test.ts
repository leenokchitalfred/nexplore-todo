import request from 'supertest'
import ExpressServer from '../expressServer'
import { type Duty } from './TodosController'

const port = parseInt(process.env.PORT ?? '3000')

describe('Todo API test', () => {
  const TODO_ITEM_TESTING_NAME = '__JEST_TODO_ITEM_TEST__'
  const server = new ExpressServer()
  let TODO_ITEM: Duty
  beforeAll(async () => {
    await server.start(port)
  })

  test('add todo test', async () => {
    const response = await request(server.getApp()).post('/todos').send({
      dutyname: TODO_ITEM_TESTING_NAME,
    })
    TODO_ITEM = response.body
    expect(TODO_ITEM).toEqual(
      expect.objectContaining({
        name: TODO_ITEM_TESTING_NAME,
      }),
    )
  })

  test('get todo test', async () => {
    const response = await request(server.getApp()).get('/todos')
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ ...TODO_ITEM })]),
    )
  })

  test('delete todo test', async () => {
    await request(server.getApp()).delete(`/todos/${TODO_ITEM?.id}`)
    const getResponse = await request(server.getApp()).get('/todos')
    expect(Array.isArray(getResponse.body)).toBe(true)
    expect(getResponse.body).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ ...TODO_ITEM })]),
    )
  })
})
