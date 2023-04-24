import React from 'react'
import { PostDTO } from '../@types'
import { Paper, Typography } from '@mui/material'

type Props = {
  post: PostDTO
}

export default function Post({ post }: Props) {
  return (
    <Paper elevation={3}>
      <Typography variant='h4' component='h1' gutterBottom>
        {post.title}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        {post.User.name}
      </Typography>
      <Typography variant='body1'>
        {post.text}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        Date: {new Date(post.createdAt).toLocaleDateString()}
      </Typography>
    </Paper>
  )
}