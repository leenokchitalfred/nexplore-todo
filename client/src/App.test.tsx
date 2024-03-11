import '@testing-library/jest-dom'
import React from 'react'
import { describe, test, expect, jest, afterEach } from '@jest/globals'
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import axios from 'axios'
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
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

describe('renders App correctly', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('renders todo list correctly', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
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
      ],
    })

    act(() => {
      render(<App />)
    })
    await waitFor(() => {
      expect(screen.getByText('Add')).toBeTruthy()
    })

    await waitFor(() => {
      screen.findByText('Duty 1')
      expect(screen.getByText('Duty 1')).toBeTruthy()
      screen.findByText('Duty 2')
      expect(screen.getByText('Duty 2')).toBeTruthy()
      screen.findByText('Duty 3')
      expect(screen.getByText('Duty 3')).toBeTruthy()
    })
  })

  test('renders todo after clicking add button correctly', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
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
      ],
    })

    const user = userEvent.setup()
    act(() => {
      render(<App />)
    })
    await waitFor(() => {
      expect(screen.getByText('Add')).toBeTruthy()
    })

    const input = screen.getByPlaceholderText('Enter a todo item')
    await user.type(input, 'Duty 4')

    expect(input).toHaveValue('Duty 4')

    mockedAxios.get.mockResolvedValue({
      data: [
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
          id: '4',
          name: 'Duty 4',
          lastupdatetime: '2024-03-05T08:07:56.091Z',
        },
      ],
    })

    const button = screen.getByText('Add')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Duty 1')).toBeTruthy()
      expect(screen.getByText('Duty 2')).toBeTruthy()
      expect(screen.getByText('Duty 4')).toBeTruthy()
    })
  })
})
