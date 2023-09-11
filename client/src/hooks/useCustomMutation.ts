import {
  MutateFunction,
  MutateOptions,
  useMutation,
  UseMutationResult
} from 'react-query'
import { AxiosError } from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import { handleFetchErrors } from '../utils/handleFetchErrors'

export type FetchErrors<F> = {
  [names in keyof F]?: string
}

export interface IFetchErrorsHandlers<F> {
  fetchErrors: FetchErrors<F>
  setFetchErrors: Dispatch<SetStateAction<FetchErrors<F>>>
}

interface ICustomMutation<D, V, F> extends IFetchErrorsHandlers<F> {
  mutation: UseMutationResult<D, AxiosError<unknown, any> | Error, V, unknown>
}

export function useCustomMutation<D, V, F>(
  mutateFn: MutateFunction<D, AxiosError | Error, V>,
  opt?: Omit<MutateOptions<D, AxiosError | Error, V>, 'onError'>
): ICustomMutation<D, V, F> {
  const [fetchErrors, setFetchErrors] = useState<FetchErrors<F>>({})

  const mutation = useMutation(mutateFn, {
    ...opt,
    onError: (error: AxiosError | Error, variables, context) => {
      handleFetchErrors(error, setFetchErrors)
    }
  })

  return { mutation, fetchErrors, setFetchErrors }
}
