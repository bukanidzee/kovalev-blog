import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import user from '../store/userStore'
import { observer } from 'mobx-react-lite'
import About from '../pages/About'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import React, { FC } from 'react'
import Articles from '../pages/Articles'
import CreateArticle from '../pages/CreateArticle'

const OnlyAdminRoute: FC = () => {
  if (user.name !== '' && user.isAdmin) {
    return <Outlet />
  }

  return <Navigate to='/login' />
}

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path='/articles' element={<Articles />} />
      <Route path='/about' element={<About />} />
      <Route element={<OnlyAdminRoute />}>
        <Route path='/articles/create' element={<CreateArticle />} />
      </Route>
      <Route
        element={user.name === '' ? <Outlet /> : <Navigate to='/articles' />}
      >
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
      <Route path='*' element={<Navigate to='/articles' />} />
    </Routes>
  )
}

export default observer(AppRouter)
