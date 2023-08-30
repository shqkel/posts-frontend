import React, { Suspense, useContext, useEffect, useState } from 'react'
import {Row, Col, Form, FormControl, Button, Spinner} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { PostContext } from '../../contexts/PostContextProvider';

const PostUpdate = () => {
  const {actions : {getPost, updatePost}} = useContext(PostContext);
  const navigate = useNavigate();
  const {id} = useParams();
  const [frm, setFrm] = useState({title: '', writer: '', content: ''});
  
  useEffect(() => {
    // async getPost는 promise를 반환한다. {state : fulfilled, result : post}
    getPost(id)
      .then((post) => setFrm(post));
  }, [])

  const onFrmChange = (e) => {
    setFrm({
      ...frm,
      [e.target.name]: e.target.value
    })
  }
  const onFrmSubmit = (e) => {
    e.preventDefault();
    updatePost(frm)
      .then((post) => {
        console.log(post);
        navigate(-1); // 뒤로가기 - 게시글상세페이지로 이동
      });
  }

  const {title, writer, content} = frm;

  return (
    <div>
      <Row>
        <Col className='p-5'>
          <h1>게시글 수정</h1>
          <Suspense fallback={<Spinner className="mt-5" animation="border" />}>
            <Form onSubmit={onFrmSubmit}>
              <FormControl name="title" className='my-3' placeholder='제목' value={title} onChange={onFrmChange}></FormControl>
              <FormControl name="writer" className='my-3' placeholder='작성자' defaultValue={writer} readOnly></FormControl>
              <FormControl name="content" className='my-3' as='textarea' rows='5' placeholder='내용' value={content} onChange={onFrmChange}></FormControl>
              <div className='text-center'>
                <Button type="submit" className='me-3'>수정</Button>
                <Button variant='secondary' onClick={() => navigate(-1)}>취소</Button>
              </div>
            </Form> 
          </Suspense>
        </Col>
      </Row>
    </div>
  )
}

export default PostUpdate