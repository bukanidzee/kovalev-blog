import { Box, BoxProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { ReactElement } from 'react'

const FormBox = (
  props: BoxProps<'form', { component: 'form' }>
): ReactElement => {
  return <Box {...props} />
}

export const StyledFormBox = styled(FormBox)<
  BoxProps<'form', { component: 'form' }>
>(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  width: '75%',
  padding: '20px 10px',
  '&& > *:nth-child(n+2)': {
    marginTop: 30
  }
  // '&& .MuiTextField-root': {
  //   width: '100%'
  // }
}))
