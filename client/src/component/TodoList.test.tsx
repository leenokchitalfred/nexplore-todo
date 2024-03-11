import '@testing-library/jest-dom'
import React from 'react'
import { describe, test, expect } from '@jest/globals'
import { render } from '@testing-library/react'
import TodoList from './TodoList'
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})

describe('SumComponent', () => {
  test('renders loading correctly', () => {
    const { getByText } = render(<TodoList isLoading={true} todos={[]} />)
    expect(getByText('Loading')).toBeInTheDocument()
  })

  test('renders error correctly', () => {
    const errorMessage = 'Network Error'
    const { getByText } = render(
      <TodoList isLoading={false} error={new Error(errorMessage)} todos={[]} />,
    )
    expect(getByText(errorMessage)).toBeInTheDocument()
  })

  test('renders empty todo list correctly', () => {
    const { getByText } = render(<TodoList isLoading={false} todos={[]} />)
    expect(getByText('No data')).toBeInTheDocument()
  })

  test('renders todo list with single data correctly', () => {
    const { getByText } = render(
      <TodoList
        isLoading={false}
        todos={[
          {
            id: '1',
            name: 'Duty 1',
            lastupdatetime: '2024-03-06T08:07:56.091Z',
          },
        ]}
      />,
    )
    expect(getByText('Duty 1')).toBeInTheDocument()
  })

  test('renders todo list with mutiple data correctly', () => {
    const { getByText } = render(
      <TodoList
        isLoading={false}
        todos={[
          {
            id: '1',
            name: 'Duty 1',
            lastupdatetime: '2024-03-04T08:07:56.091Z',
          },
          {
            id: '2',
            name: 'Duty 2',
            lastupdatetime: '2024-03-05T08:07:56.091Z',
          },
          {
            id: '3',
            name: 'Duty 3',
            lastupdatetime: '2024-03-06T08:07:56.091Z',
          },
        ]}
      />,
    )
    expect(getByText('Duty 1')).toBeInTheDocument()
    expect(getByText('Duty 2')).toBeInTheDocument()
    expect(getByText('Duty 3')).toBeInTheDocument()
  })
})
