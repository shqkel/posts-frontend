import React, { createContext, useState } from 'react'
import axios from 'axios'
import { api } from './AppContextProvider';


export const PostContext = createContext();

const PostContextProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState(''); // query 또한 context에서 관리해야 뒤로가기 등에서 새로 로드되지 않는다.
  const [totalPages, setTotalPages] = useState();

  const getPosts = async (query) => {
    const url = query ? 
      `/posts/search2?query=${query}&page=${page}` : 
        `/posts?page=${page}`;
    const response = await axios(url);
    console.log(response.data);
    const {content, number, totalElements, totalPages} = response.data;
    setPosts(content);
    setTotalPages(totalPages);
  };
  const getPost = async (id) => {
    const response = await axios.get(`/posts/${id}`);
    console.log(response.data);
    return response.data;
  };
  const createPost = async (post) => {
    return await api.post('/posts', post);
  };
  const updatePost = async (post) => {
    return await api.patch(`/posts/${post.id}`, post);
  };
  const deletePost = async (id) => {
    await api.delete(`/posts/${id}`);
  };

  const value = {
    states: { 
      posts, 
      page, 
      totalPages, 
      query 
    },
    actions: { 
      getPosts, 
      getPost, 
      createPost, 
      updatePost, 
      deletePost, 
      setPage, 
      setQuery
    },
  };
  return (
    <PostContext.Provider value={value}>
      {props.children}
    </PostContext.Provider>
  )
}

export default PostContextProvider