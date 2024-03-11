import useSWR, { Fetcher } from 'swr'
import { type Duty } from '../types/todos.type'
import axios from 'axios'

const fetcher: Fetcher<Duty[], string> = (url: string) =>
  axios.get(url).then((res) => {
    return res.data
  })

export default function useTodos(baseApiPath: string) {
  const { data, error, isLoading, mutate } = useSWR<Duty[]>(
    `${baseApiPath}/todos`,
    fetcher,
    { dedupingInterval: 0 },
  )
  return {
    todos: data,
    isLoading,
    error,
    mutate,
  }
}
