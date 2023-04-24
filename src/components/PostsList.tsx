import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { PostDTO } from '../@types'
import { Box } from '@mui/material'
import PostCard from './PostCard'

type Props = {
  posts: PostDTO[]
}

export default function PostsList({ posts }: Props) {

  return (
    <Box sx={{}} component='section'>
      {
        posts.map(post => (
          <PostCard post={post} key={post.id} />
        ))
      }
    </Box>
  )
}