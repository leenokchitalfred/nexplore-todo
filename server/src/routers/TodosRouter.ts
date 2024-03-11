import { Router } from 'express'
import TodosController from '../controllers/TodosController'

const router = Router()
const todosController = new TodosController()

router.get('/', todosController.get)
router.post('/', todosController.add)
router.delete('/:id', todosController.delete)

export default router
