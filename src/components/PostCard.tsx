import React from 'react'
import { PostDTO } from '../@types'
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'

type Props = {
  post: PostDTO
}

export default function PostCard({ post }: Props) {
  return (
    <Card sx={{ 
      minWidth: 275,
      mb: '1rem'
    }}>
      <CardContent>
        <Typography variant='h6' component='h2' color="text.secondary" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2">
          Author: {post.User.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Read More</Button>
      </CardActions>
    </Card>
  )
}