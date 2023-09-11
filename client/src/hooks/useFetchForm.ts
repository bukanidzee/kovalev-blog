import { useEffect } from 'react'
import { TObjWithStrKeys } from './../types/objectWithStringKeys'
import { IFetchErrorsHandlers } from './useCustomMutation'
import {
  DeepRequired,
  FieldErrorsImpl,
  useForm,
  UseFormReturn
} from 'react-hook-form'

type TRequiredFields =
  | 'register'
  | 'handleSubmit'
  | 'getValues'
  | 'resetField'
  | 'setValue'

export function useFetchForm<F extends TObjWithStrKeys>({
  fetchErrors,
  setFetchErrors
}: IFetchErrorsHandlers<F>): Pick<UseFormReturn<F>, TRequiredFields> & {
  errors: Partial<FieldErrorsImpl<DeepRequired<F>>>
} {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    resetField,
    watch,
    setValue
  } = useForm<F>()

  useEffect(() => {
    const subscription = watch((_data, { name }) => {
      if (typeof name === 'string' && fetchErrors[name] !== undefined) {
        const newFetchErrors = { ...fetchErrors }
        newFetchErrors[name] = undefined
        setFetchErrors(newFetchErrors)
      }
    })

    return () => subscription.unsubscribe()
  }, [fetchErrors, setFetchErrors, watch])
  return {
    register,
    handleSubmit,
    getValues,
    errors,
    resetField,
    setValue
  }
}
