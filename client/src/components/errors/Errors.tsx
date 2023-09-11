import { Box } from '@mui/system'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import errorStore from '../../store/errorStore'
import ErrorComponent from './ErrorComponent'

const Errors: FC = () => {
  return (
    <Box
      position='fixed'
      top={0}
      right={0}
      bottom={0}
      left={0}
      zIndex={1500}
      sx={{ pointerEvents: 'none' }}
    >
      <Box position={'absolute'} left={5} bottom={5}>
        {errorStore.errorMessages
          .map((message, index) => (
            <ErrorComponent
              errorMessage={message}
              key={message}
              index={index}
            />
          ))
          .reverse()}
      </Box>
    </Box>
  )
}

export default observer(Errors)
