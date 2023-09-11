import { Avatar, Button, IconButton } from '@mui/material'
import { Stack } from '@mui/system'
import ClearIcon from '@mui/icons-material/Clear'
import React, {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  ReactElement
} from 'react'
import { Path, UseFormRegister, UseFormResetField } from 'react-hook-form'
import { TObjWithStrKeys } from '../../types/objectWithStringKeys'
import { ImageCard } from './ImageCard'

interface IProps<D extends TObjWithStrKeys> {
  register: UseFormRegister<D>
  picture: string
  setPicture: Dispatch<SetStateAction<string>>
  resetField: UseFormResetField<D>
  isAvatar: boolean
  label: string
  name: Path<D>
}

const ChoosePictureSet = <D extends TObjWithStrKeys>({
  register,
  picture,
  setPicture,
  resetField,
  isAvatar,
  label,
  name
}: IProps<D>): ReactElement => {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newImage = e.target?.files?.[0]
    if (newImage !== undefined) {
      setPicture(URL.createObjectURL(newImage))
    }
  }

  const { ...inputImageProps } = register(name, {
    onChange: onInputChange
  })

  return (
    <>
      <Button variant='contained' component='label'>
        {label}
        <input type='file' hidden accept='image/*' {...inputImageProps} />
      </Button>
      {picture !== '' && (
        <Stack direction='row' spacing={2} alignItems='center'>
          {isAvatar ? (
            <Avatar
              src={picture}
              sx={{
                width: '4rem',
                height: '4rem'
              }}
            />
          ) : (
            <ImageCard>
              <img src={picture} />
            </ImageCard>
          )}
          <IconButton
            onClick={() => {
              resetField(name)
              setPicture('')
            }}
          >
            <ClearIcon />
          </IconButton>
        </Stack>
      )}
    </>
  )
}

export default ChoosePictureSet
