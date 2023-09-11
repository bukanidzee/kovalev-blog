import { IconButton, IconButtonProps } from '@mui/material'
import { styled } from '@mui/system'

export const AbsoluteIconButton = styled(IconButton)<IconButtonProps>(() => ({
  position: 'absolute',
  top: 10,
  right: 10,
  color: 'primary',
  width: '4rem',
  height: '4rem'
}))
