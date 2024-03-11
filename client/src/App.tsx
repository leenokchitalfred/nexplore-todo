import React, { useEffect, useState } from 'react'
import './App.css'
import axios, { type AxiosError } from 'axios'
import useTodos from './customhook/useTodos'
import { useForm } from 'antd/es/form/Form'
import { Col, Row, Input, Space, Button, Form, message } from 'antd'
import TodoList from './component/TodoList'

const FORM_FIELD_DUTY_NAME = 'Duty name'
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL

function App() {
  const [form] = useForm()
  const dutyName = Form.useWatch<string>(FORM_FIELD_DUTY_NAME, form)
  const [submittable, setSubmittable] = useState<boolean>(false)
  const { todos, error, isLoading, mutate } = useTodos(BASE_API_URL!)
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false))
  }, [form, dutyName])

  const onAddHandler = async () => {
    try {
      await axios
        .post(`${BASE_API_URL}/todos`, { dutyname: dutyName })
        .catch((err: AxiosError) => {
          throw Error(JSON.stringify(err.response?.data))
        })
      form.resetFields()
    } catch (err) {
      const _err = err as Error
      messageApi.open({
        type: 'error',
        content: _err.message,
      })
    } finally {
      mutate()
    }
  }
  const removeItemHandler = async (id: string) => {
    try {
      await axios.delete(`${BASE_API_URL}/todos/${id}`)
    } catch (err) {
      const _err = err as Error
      messageApi.open({
        type: 'error',
        content: _err.message,
      })
    } finally {
      mutate()
    }
  }
  return (
    <div className="App">
      {contextHolder}
      <Row justify="center">
        <Col span={12}>
          <Form
            form={form}
            name="todoForm"
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              hasFeedback
              name="Duty name"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: 'Duty name is required',
                },
                { max: 255 },
              ]}
            >
              <Space.Compact style={{ width: '100%' }}>
                <Input placeholder="Enter a todo item" />
                <Button
                  type="primary"
                  onClick={onAddHandler}
                  disabled={!submittable}
                >
                  Add
                </Button>
              </Space.Compact>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={12}>
          <TodoList
            isLoading={isLoading}
            error={error}
            todos={todos}
            removeItemHandler={removeItemHandler}
          />
        </Col>
      </Row>
    </div>
  )
}

export default App
