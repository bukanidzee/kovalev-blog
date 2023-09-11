import { CenterContainer } from '../../components/UI/CenterContainer'
import { useHeightResizeObserve } from '../../hooks/useHeightObserve'
import { Typography, TextField, Button, Box } from '@mui/material'
import { StyledFormBox } from '../../components/UI/FormBox'
import React, { useState, FC } from 'react'
import { handleFormErrors } from '../../utils/handleFormErrors'
import { fetchRegister } from '../../api/userAPI'
import { createFormData } from '../../utils/createFormData'
import { useCustomMutation } from '../../hooks/useCustomMutation'
import { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useFetchForm } from '../../hooks/useFetchForm'
import ChoosePictureSet from '../../components/UI/ChoosePictureSet'
import { IFetchSuccess } from '../../types/fetchtypes'

export interface IRegisterData {
  email: string
  name: string
  password: string
  second_password: string
  picture?: FileList
}

const Register: FC = () => {
  const { height, ref } = useHeightResizeObserve<HTMLDivElement>()

  const { mutation, fetchErrors, setFetchErrors } = useCustomMutation<
    AxiosResponse<IFetchSuccess, any>,
    FormData,
    IRegisterData
  >(fetchRegister, {
    onSuccess: (_data, _variables, _context) => {
      navigate('/login')
    }
  })

  const { register, handleSubmit, getValues, errors, resetField } =
    useFetchForm<IRegisterData>({ fetchErrors, setFetchErrors })

  const navigate = useNavigate()

  const onSubmit = handleSubmit(data => {
    const formData = createFormData(data)

    mutation.mutate(formData)
  })

  const [picture, setPicture] = useState<string>('')

  return (
    <CenterContainer ref={ref} sx={{ height }}>
      <StyledFormBox component='form' onSubmit={onSubmit}>
        <Typography variant='h4'>Зарегистрироваться</Typography>
        <TextField
          label='Email'
          {...register('email', { required: true })}
          {...handleFormErrors(errors, fetchErrors, 'email')}
          autoFocus
          required
          fullWidth
          variant='standard'
          type='email'
        />
        <TextField
          label='Имя'
          {...register('name')}
          {...handleFormErrors(errors, fetchErrors, 'name')}
          fullWidth
          variant='standard'
          type='text'
        />
        <TextField
          label='Пароль'
          variant='standard'
          {...register('password', { required: true })}
          {...handleFormErrors(errors, fetchErrors, 'password')}
          required
          fullWidth
          type='password'
        />
        <TextField
          label='Повторите пароль'
          variant='standard'
          {...register('second_password', {
            required: true,
            validate: v =>
              v === getValues('password') ||
              'Пожалуйста введите правильный пароль'
          })}
          {...handleFormErrors(errors, fetchErrors, 'second_password')}
          required
          fullWidth
          type='password'
        />
        <Box
          display='flex'
          justifyContent={picture !== '' ? 'space-between' : 'flex-start'}
          alignItems='center'
          width='100%'
          height='4rem'
        >
          <ChoosePictureSet
            register={register}
            picture={picture}
            setPicture={setPicture}
            resetField={resetField}
            isAvatar={true}
            label='Выбрать аватар'
            name='picture'
          />
        </Box>
        <Button type='submit' variant='contained' fullWidth>
          Зарегистрироваться
        </Button>
      </StyledFormBox>
    </CenterContainer>
  )
}

export default Register

//  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
//    const newImage = e.target?.files?.[0]
//    if (newImage !== undefined) {
//      setPicture(URL.createObjectURL(newImage))
//    }
//  }

//  const { ...inputImageProps } = register('picture', {
//    onChange: onInputChange
//  })

//  <Button variant='contained' component='label'>
//           Выбрать аватар
//           <input type='file' hidden accept='image/*' {...inputImageProps} />
//         </Button>
//         {picture !== '' && (
//           <Stack direction='row' spacing={2} alignItems='center'>
//             <Avatar
//               src={picture}
//               sx={{
//                 width: '4rem',
//                 height: '4rem'
//               }}
//             />
//             <IconButton
//               onClick={() => {
//                 resetField('picture')
//                 setPicture('')
//               }}
//             >
//               <ClearIcon />
//             </IconButton>
//           </Stack>
//         )}
