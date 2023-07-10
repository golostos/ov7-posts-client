import { useContext } from 'react'
import { PostDTO } from '../@types'
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import LinkContext from '../services/linkContext'

type Props = {
  post: PostDTO
  // setPostId: React.Dispatch<React.SetStateAction<number | null>>
}

export default function PostCard({ post }: Props) {
  const [link, setLink] = useContext(LinkContext)
  console.log(link)
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
        <Button size="small" onClick={() => {
          // setPostId(post.id)
          setLink('/posts/' + post.id)
        }}>
          Read More
        </Button>
      </CardActions>
    </Card>
  )
}