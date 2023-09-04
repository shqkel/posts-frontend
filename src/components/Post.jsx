import React from 'react'
import { Link } from 'react-router-dom'
import { formatDateTime } from '../utils/Utils'

const Post = ({post}) => {
  return (
    <tr key={post.id}>
      <td>{post.id}</td>
      <td>
        <Link to={`/posts/detail/${post.id}`}>
        {post.title}
        </Link>
      </td>
      <td>{post.writer}</td>
      <td>{formatDateTime(post.createdAt)}</td>
    </tr> 
  )
}

export default Post