import { Box } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import React, { FC } from 'react'
import userStore from '../store/userStore'
import { useNavigate } from 'react-router-dom'
import { AbsoluteIconButton } from '../components/UI/AbsoluteIconButton'

const Articles: FC = () => {
  const navigate = useNavigate()
  return (
    <Box position='relative' minHeight={'100%'}>
      {userStore.isAdmin && (
        <AbsoluteIconButton onClick={() => navigate('/articles/create')}>
          <AddCircleIcon
            sx={{
              width: 'inherit',
              height: 'inherit'
            }}
          />
        </AbsoluteIconButton>
      )}
    </Box>
  )
}

export default Articles
