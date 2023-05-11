import { Container, Typography } from '@mui/material'
import { useContext } from 'react'
import PostsList from './PostsList'
import { PostDTO } from '../@types'
import Post from './Post'
import LinkContext from '../services/linkContext'
import Users from './Users'
import About from './About'
import { Routes } from '../services/routes'
import NotFound from './404'
import Login from './Login'
import useHistory from '../services/historyHook'
import useData from '../services/getDataHook'

// type Props = {
// postId: number | null 
// setPostId: React.Dispatch<React.SetStateAction<number | null>>
// }

export default function MainComponent() {
  const [link, setLink] = useContext(LinkContext)
  const [posts, setPosts] = useData<PostDTO[]>('/api/posts')
  // const post = useMemo(() => posts.find(post => post.id === postId), [postId, posts])
  useHistory()
  function router() {
    if (link === Routes.MAIN) return <PostsList posts={posts} />
    if (link === Routes.USERS) return <Users />
    if (link === Routes.ABOUT) return <About />
    if (link === Routes.LOGIN) return <Login />
    const postReg = new RegExp('^/posts/[0-9]+$')
    if (postReg.test(link)) {
      const postId = Number(link.split('/').pop())
      const post = posts.find(post => post.id === postId)
      if (post) return <Post post={post} />
      return <NotFound />
    }
  }
  return (
    <Container maxWidth='lg'>
      {router()}
    </Container>
  )
}