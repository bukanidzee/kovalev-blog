import { CenterContainer } from '../../components/UI/CenterContainer'
import { useHeightResizeObserve } from '../../hooks/useHeightObserve'
import { Typography, TextField, Button, Link } from '@mui/material'
import { StyledFormBox } from '../../components/UI/FormBox'
import { handleFormErrors } from '../../utils/handleFormErrors'
import { Link as RouterLink } from 'react-router-dom'
import React, { FC } from 'react'
import { useCustomMutation } from '../../hooks/useCustomMutation'
import { AxiosResponse } from 'axios'
import { fetchLogin, ILoginResponse } from '../../api/userAPI'
import { useFetchForm } from '../../hooks/useFetchForm'
import userStore from '../../store/userStore'

export interface ILoginData {
  email: string
  password: string
}

const Login: FC = () => {
  const { height, ref } = useHeightResizeObserve<HTMLDivElement>()

  const { mutation, fetchErrors, setFetchErrors } = useCustomMutation<
    AxiosResponse<ILoginResponse, any>,
    ILoginData,
    ILoginData
  >(fetchLogin, {
    onSuccess: response => {
      console.log(response)

      userStore.login(response.data)
    }
  })

  const { register, handleSubmit, errors } = useFetchForm<ILoginData>({
    fetchErrors,
    setFetchErrors
  })

  const onSubmit = handleSubmit((data: ILoginData): void => {
    mutation.mutate(data)
  })

  return (
    <CenterContainer ref={ref} sx={{ height }}>
      <StyledFormBox component='form' onSubmit={onSubmit}>
        <Typography variant='h4'>Войти</Typography>
        <TextField
          label='Email'
          {...register('email', { required: true })}
          {...handleFormErrors(errors, fetchErrors, 'email')}
          autoFocus
          required
          fullWidth
          variant='standard'
          type='email'
          sx={{
            color: 'inherit'
          }}
        />
        <TextField
          label='Пароль'
          variant='standard'
          {...register('password', { required: true })}
          {...handleFormErrors(errors, fetchErrors, 'password')}
          required
          fullWidth
          type='password'
          sx={{
            color: 'inherit'
          }}
        />
        <Button type='submit' variant='contained' fullWidth>
          Войти
        </Button>
        <Link component={RouterLink} to='/register'>
          Ещё не зарегистрированы? Сделайте это сегодня!
        </Link>
      </StyledFormBox>
    </CenterContainer>
  )
}

export default Login
