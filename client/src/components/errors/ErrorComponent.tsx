import React, { FC } from 'react'
import { Alert, AlertTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import errorStore from '../../store/errorStore'

interface IErrorProp {
  errorMessage: string
  index: number
}

const ErrorComponent: FC<IErrorProp> = ({ errorMessage, index }) => {
  return (
    <Alert
      severity='error'
      action={
        <IconButton
          aria-label='close'
          color='inherit'
          size='small'
          onClick={() => {
            errorStore.clearOld(index)
          }}
        >
          <CloseIcon fontSize='inherit' />
        </IconButton>
      }
      sx={{
        mt: 4,
        pointerEvents: 'auto'
      }}
    >
      <AlertTitle>Ошибка!</AlertTitle>
      {errorMessage}
    </Alert>
  )
}

export default ErrorComponent
