import { Avatar, Box, Typography, BoxProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import avatar from '../assets/Kovalev.jpg'
import { CenterContainer } from './UI/CenterContainer'
import { useHeightObserve } from '../hooks/useHeightObserve'
import React, { FC } from 'react'

const AboutMeBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 10,
  padding: 10,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  '&& > *:nth-child(n+2)': {
    marginTop: 10
  }
}))

const AboutMe: FC = () => {
  const { ref, height } = useHeightObserve<HTMLDivElement>()

  return (
    <CenterContainer
      ref={ref}
      sx={{
        height
      }}
    >
      <AboutMeBox>
        <Avatar
          src={avatar}
          sx={{
            width: '10rem',
            height: '10rem'
          }}
        />
        <Typography variant='body2' color='inherit'>
          React frontend разработчик
        </Typography>
        <Typography
          variant='body2'
          color='inherit'
          sx={{ textAlign: 'justify', textIndent: '1rem' }}
        >
          Больше года я изучаю frontend разработку, этот блог я создал для
          тренировки и дабы в будущем иметь средство отслеживать свой прогресс
        </Typography>
      </AboutMeBox>
    </CenterContainer>
  )
}

export default AboutMe
