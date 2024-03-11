import React from 'react'
import { Duty } from '../types/todos.type'
import { Button, Flex, List, Spin, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

interface TodoListPros {
  isLoading: boolean
  todos?: Duty[]
  error?: Error
  removeItemHandler?: (id: string) => void
}
const TodoList: React.FC<TodoListPros> = (props: TodoListPros) => {
  const { todos, isLoading, error, removeItemHandler } = props
  return (
    <>
      {isLoading ? (
        <>
          <span data-testid="todo-loading">Loading</span>
          <Spin />
        </>
      ) : error ? (
        <span className="erro_message">{error.message}</span>
      ) : (
        <List
          data-testid="todo-list"
          bordered
          dataSource={todos}
          renderItem={(item) => (
            <List.Item>
              <Flex
                className="duty-item"
                justify={'space-between'}
                align={'center'}
              >
                <div>{item.name} </div>
                <Tooltip title="delete">
                  <Button
                    type="primary"
                    danger
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={() => removeItemHandler?.(item.id)}
                  />
                </Tooltip>
              </Flex>
            </List.Item>
          )}
        />
      )}
    </>
  )
}

export default TodoList
