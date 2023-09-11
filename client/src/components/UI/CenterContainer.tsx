import { Container, ContainerProps } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CenterHorizontalyContainer = styled(Container)<ContainerProps>(
  () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0
  })
)

export const CenterContainer = styled(
  CenterHorizontalyContainer
)<ContainerProps>(() => ({
  justifyContent: 'center'
}))
