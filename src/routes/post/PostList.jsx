import React, { useContext, useEffect } from 'react'
import { Col, Form, InputGroup } from 'react-bootstrap'
import { Table } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { PostContext } from '../../contexts/PostContextProvider';
import Post from '../../components/Post'
import PagingButtons from '../../components/PagingButtons'
import { useRef } from 'react'



const PostList = () => {
  const appContext = useContext(PostContext);
  // console.log(appContext); // {states: {…}, actions: {…}}
  const {states:{posts, page, query}, actions: {getPosts, setQuery}} = appContext;

  const queryRef = useRef();
  useEffect(() => {
    getPosts(query);

    // custom event handler 등록하기 (2023/08 현재 onSearch 제공하지 않음)
    // input:search clear버튼(x) 클릭시 search event가 발생함.
    queryRef.current.addEventListener('search', (e) => {
      console.log('onsearch : ', e);
      getPosts(query);
    });
  }, [page]);
  
  const onSearchFrmSubmit = (e) => {
    e.preventDefault();
    getPosts(query);
  }

  return (
    <>
      <Row>
        <Col>
          <h1>게시글 목록</h1>
          <div className='mb-3 d-flex justify-content-between'>
            <Form onSubmit={onSearchFrmSubmit}>
              <InputGroup>
                <Form.Control 
                  type="search" 
                  name='query'
                  ref={queryRef} 
                  placeholder="제목 / 작성자 / 내용..." 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)} />
                <Button type="submit" variant="outline-success">Search</Button>
              </InputGroup>
            </Form>
            <Link to="/posts/create">
              <Button>글쓰기</Button>
            </Link>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일시</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => <Post key={post.id} post={post} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
      <PagingButtons />
    </>
  )
}

export default PostList