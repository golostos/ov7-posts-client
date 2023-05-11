import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { PostDTO } from '../@types'
import { Box, Typography } from '@mui/material'
import PostCard from './PostCard'

type Props = {
  posts: PostDTO[]
  // setPostId: React.Dispatch<React.SetStateAction<number | null>>
}

export default function PostsList({ posts }: Props) {

  return (
    <Box sx={{}} component='section'>
      <Typography variant='h4' component='h1'>Posts</Typography>
      {
        posts.map(post => (
          <PostCard post={post} key={post.id} />
        ))
      }
    </Box>
  )
}