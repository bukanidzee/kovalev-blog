import axios, { AxiosError } from 'axios'
import { Dispatch, SetStateAction } from 'react'
import errorStore from '../store/errorStore'

export function handleFetchErrors<T extends {}>(
  err: AxiosError | Error,
  setFetchErrors: Dispatch<SetStateAction<T>>
): void {
  if (axios.isAxiosError(err)) {
    if (err.response !== undefined) {
      if (err.response.status >= 500) {
        errorStore.setError(
          `Произошла ошибка ${err.response.status}, произошла внутренняя ошибка сервера!`
        )
      } else if (err.response.status === 400) {
        setFetchErrors(prev => {
          return { ...prev, ...err.response?.data }
        })
      } else if (err.response.status === 401) {
        errorStore.setError(
          `Произошла ошибка ${err.response.status}, вы не авторизованы!`
        )
      } else if (err.response.status === 403) {
        errorStore.setError(
          `Произошла ошибка ${err.response.status}, доступ запрещён!`
        )
      } else if (err.response.status === 404) {
        errorStore.setError(
          `Произошла ошибка ${err.response.status}, страница не найдена!`
        )
      } else if (err.response.status > 404) {
        errorStore.setError(
          `Произошла ошибка ${err.response.status}, редкая ошибка запроса!`
        )
      }
    } else if (err.request !== undefined) {
      errorStore.setError(
        'Не удалось получить ответ от сервера, проверьте соединение!'
      )
    }
  } else {
    console.log(err)
    errorStore.setError(
      `Упс что-то сломалось, мы работаем над этим! Ошибка: ${err.message}`
    )
  }
}
