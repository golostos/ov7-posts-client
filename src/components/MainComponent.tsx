import { Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PostsList from './PostsList'
import axios, { AxiosError } from 'axios'
import { PostDTO } from '../@types'

type Props = {}

export default function MainComponent({ }: Props) {
  const [posts, setPosts] = useState<PostDTO[]>([])
  useEffect(() => {
    async function getData() {
      try {
        const posts = (await axios.get<PostDTO[]>('/api/posts')).data
        setPosts(posts)
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error)
        }
      }
    }
    getData()
  }, [])
  return (
    <Container maxWidth='lg'>
      {/* Condition render */}
      <Typography variant='h4' component='h1'>Posts</Typography>
      <PostsList posts={posts} />
    </Container>
  )
}