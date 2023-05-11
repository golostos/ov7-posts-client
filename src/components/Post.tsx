import React, { useContext } from 'react'
import { PostDTO } from '../@types'
import { Button, Paper, Typography } from '@mui/material'
import LinkContext from '../services/linkContext'
import { Routes } from '../services/routes'

type Props = {
  post: PostDTO
  // setPostId: React.Dispatch<React.SetStateAction<number | null>>
}

export default function Post({ post }: Props) {
  const [link, setLink] = useContext(LinkContext)
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
      <Button size="small" onClick={() => {
        setLink(Routes.MAIN)
      }}>
        Back to main
      </Button>
    </Paper>
  )
}