import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../contexts/PostContextProvider';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const frmInitState = {
  title : 'React Hooks',
  writer : 'Sophie Alpert and Dan Abramov',
  content : 'Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.'
};

const PostCreate = () => {
  const [frm, setFrm] = useState(frmInitState);
  const navigate = useNavigate();
  
  const onFrmChange = (e) => {
    setFrm({
      ...frm,
      [e.target.name] : e.target.value
    });
  };

  const {actions : {createPost}} = useContext(PostContext);

  const onFrmSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사
    if(!validateData()) {
      alert('입력값이 유효하지 않습니다.');
      return;
    } 

    createPost(frm)
      .then((response) => {
        console.log(response);
        // alert('새 게시글이 등록되었습니다.');
        // navigate('/posts');
        const {headers : {location}} = response; // /posts/5
        navigate(`/posts/detail${location.substring(location.lastIndexOf('/'))}`);
      })

  }

  const validateData = () => {
    if(!/^.+$/.test(title)) return false;
    if(!/^.+$/.test(writer)) return false;
    if(!/^(.|\n)+$/.test(content)) return false;
    return true;
  };

  const {title, writer, content} = frm;
  return (
    <>
      <Row>
        <Col className='p-5'>
          <h1>게시글 등록</h1>
          <Form onSubmit={onFrmSubmit}>
            <FormControl name="title" className='my-3' placeholder='제목' value={title} onChange={onFrmChange}></FormControl>
            <FormControl name="writer" className='my-3' placeholder='작성자' value={writer} onChange={onFrmChange}></FormControl>
            <FormControl name="content" className='my-3' as='textarea' rows='5' placeholder='내용' value={content} onChange={onFrmChange}></FormControl>
            <div className='text-center'>
              <Button type="submit" className='me-3'>등록</Button>
              <Button variant='secondary' onClick={() => setFrm(frmInitState)}>취소</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  )
}


export default PostCreate