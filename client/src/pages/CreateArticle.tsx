import React, { FC, useState } from 'react'
import { IArticleData, postArticle } from '../api/articleAPI'
import { useCustomMutation } from '../hooks/useCustomMutation'
import { useFetchForm } from '../hooks/useFetchForm'
import { AxiosResponse } from 'axios'
import { StyledFormBox } from '../components/UI/FormBox'
import { Button, TextField, Typography } from '@mui/material'
import { handleFormErrors } from '../utils/handleFormErrors'
import ChoosePictureSet from '../components/UI/ChoosePictureSet'
import MarkdownEditor from '../components/MarkdownEditor'
import { CenterHorizontalyContainer } from '../components/UI/CenterContainer'
import { createFormData } from '../utils/createFormData'

export interface IArticleFormData {
  title: string
  shortDescription: string
  content: string | File
  picture: FileList
}

const CreateArticle: FC = () => {
  const { fetchErrors, setFetchErrors, mutation } = useCustomMutation<
    AxiosResponse<IArticleData, any>,
    FormData,
    IArticleFormData
  >(postArticle)

  const { register, handleSubmit, errors, resetField, setValue } =
    useFetchForm<IArticleFormData>({
      fetchErrors,
      setFetchErrors
    })

  const [picture, setPicture] = useState<string>('')

  const onSubmit = handleSubmit(data => {
    const blob = new Blob([data.content], { type: 'text/plain' })
    data.content = new File([blob], 'content.md', { type: 'text/plain' })
    const formData = createFormData(data)

    mutation.mutate(formData)
  })

  return (
    <CenterHorizontalyContainer>
      <StyledFormBox component='form' onSubmit={onSubmit}>
        <Typography variant='h4'>Создание статьи</Typography>
        <TextField
          label='Заголовок'
          {...register('title', { required: true })}
          {...handleFormErrors(errors, fetchErrors, 'title')}
          autoFocus
          required
          fullWidth
          variant='outlined'
          type='text'
        />
        <TextField
          label='Краткое описание'
          {...register('shortDescription', {
            required: true,
            maxLength: 200,
            minLength: 10
          })}
          {...handleFormErrors(errors, fetchErrors, 'shortDescription')}
          multiline
          fullWidth
          required
          variant='outlined'
          type='text'
        />
        <ChoosePictureSet
          register={register}
          picture={picture}
          setPicture={setPicture}
          resetField={resetField}
          isAvatar={false}
          label='Выбрать картинку для заголовка'
          name='picture'
        />
        <MarkdownEditor
          register={register}
          name='content'
          setContent={value => setValue('content', value)}
        />
        <Button type='submit' variant='contained' fullWidth>
          Опубликовать
        </Button>
      </StyledFormBox>
    </CenterHorizontalyContainer>
  )
}

export default CreateArticle
