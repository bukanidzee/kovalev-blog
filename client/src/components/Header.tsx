import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import user from '../store/userStore'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import React, { FC } from 'react'

const Header: FC = () => {
  const navigate = useNavigate()
  return (
    <AppBar position='static' sx={{ width: 'inherit' }}>
      <Toolbar>
        <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
          Блог Ковалева Александра
        </Typography>
        {user.name !== '' ? (
          <>
            <Button color='inherit' onClick={() => navigate('/')}>
              Главная
            </Button>
            <Button color='inherit' onClick={() => user.logout()}>
              Выйти
            </Button>
          </>
        ) : (
          <>
            <Button color='inherit' onClick={() => navigate('/login')}>
              Войти
            </Button>
            <Button color='inherit' onClick={() => navigate('/register')}>
              Зарегистрироваться
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default observer(Header)
