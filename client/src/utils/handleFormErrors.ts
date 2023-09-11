import { FieldErrors, FieldValues } from 'react-hook-form'

// interface Props<T extends FieldValues = FieldValues, F extends {}>{
//   vErrors: FieldErrors<T>
//   name: keyof T | keyof F
//   fErrors: F
// }

type TFErrors<T> = {
  [name in keyof T]: string
}

interface IFieldError {
  error: boolean
  helperText: string
}

export const handleFormErrors = <
  T extends FieldValues,
  F extends Partial<TFErrors<T>>
>(
  vErrors: FieldErrors<T>,
  fErrors: F,
  name: keyof T
): IFieldError => {
  const error: boolean =
    vErrors[name] !== undefined || fErrors[name] !== undefined || false

  let helperText: string = ''

  console.log(vErrors)

  console.log(fErrors)

  if (vErrors[name]?.type === 'required') {
    helperText = 'Это поле обязательно к заполнению'
  } else if (vErrors[name]?.type === 'validate') {
    const validateError = vErrors[name]?.message
    if (typeof validateError === 'string') {
      helperText = validateError
    }
  }

  const fetchError = fErrors[name]

  if (typeof fetchError === 'string') {
    if (helperText !== '') {
      helperText = helperText + '\n' + fetchError
    } else {
      helperText = fetchError
    }
  }

  return { error, helperText }
}
