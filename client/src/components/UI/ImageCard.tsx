import { Paper, styled } from '@mui/material'

export const ImageCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  width: '100%',
  '&& > img': {
    width: '100%',
    objectFit: 'scale-down'
  }
}))
