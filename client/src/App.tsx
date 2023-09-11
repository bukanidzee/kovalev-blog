// import styled from 'styled-components';
import { CssBaseline, Box, Container, Grid } from '@mui/material'
import background from './assets/background.png'
import Header from './components/Header'
import AppRouter from './components/AppRouter'
import AboutMe from './components/AboutMe'
import { useHeightResizeObserve } from './hooks/useHeightObserve'
import Errors from './components/errors/Errors'
import React, { FC, useEffect } from 'react'
import userStore from './store/userStore'

const App: FC = () => {
  const { height, ref } = useHeightResizeObserve<HTMLDivElement>()

  useEffect(() => {
    const userData = localStorage.getItem('userData')
    if (userData !== null) {
      userStore.login(JSON.parse(userData))
    }
  })

  return (
    <>
      <CssBaseline />
      <Errors />
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}
      >
        <Header />
        <Container
          maxWidth='lg'
          ref={ref}
          sx={{
            mt: '1rem',
            backgroundColor: '#fff',
            height: 'auto',
            minHeight: height,
            opacity: 0.95
          }}
        >
          <Grid
            container
            sx={{
              position: 'relative',
              mt: '1rem'
            }}
          >
            <Grid item xs={8} md={9} component='main'>
              <AppRouter />
            </Grid>
            <Grid
              item
              xs={4}
              md={3}
              component='aside'
              sx={{
                position: 'sticky',
                top: 0,
                height: '20rem'
              }}
            >
              <AboutMe />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default App
