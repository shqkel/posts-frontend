import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PostContext } from '../../contexts/PostContextProvider';
import { Card, Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { formatDate } from '../../utils/Utils';
import { Button } from 'react-bootstrap';
import { AppContext } from '../../contexts/AppContextProvider';

const PostDetail = () => {
  const navigate = useNavigate();
  // path variable 가져오기
  const {id} = useParams();
  
  const {actions : {getPost, deletePost}} = useContext(PostContext);
  const {states : {isLogin}} = useContext(AppContext);
  const [post, setPost] = useState({
    id : '',
    title : '',
    writer : '',
    content : '',
    createdAt : ''
  });

  const [found, setFound] = useState(true);
  useEffect(() => {
    // async getPost는 promise를 반환한다. {state : fulfilled, result : post}
    getPost(id)
      .then((post) => setPost(post))
      .catch(() => setFound(false));
  }, [])

  const {title, writer, content, createdAt} = post;
  
  const onDelete = async () => {
    if(window.confirm('이 게시글을 삭제하시겠습니까?')) {
      deletePost(id)
        .then((response) => {
          alert('정상적으로 삭제되었습니다.');
          navigate('/posts');
        })
      // navigator(-1);
    }
  };

  return (
    <div>
      <h1>게시글 상세보기</h1>
      <Row className='p-3'>
        {
          found || 
          <Col>
            <h6>해당 게시물은 존재하지 않습니다.</h6>
          </Col>
        }
        {
          found &&
          <>
            {/* 로그인한 사용자, 작성자 본인에게만 노출되도록 조건 작성 */}
            {isLogin && 
              <Row className='p-3'>
                <Col>
                  <Link to={`/posts/update/${id}`}>
                    <Button variant="outline-secondary" size="sm">수정</Button>
                  </Link>
                  {' '}
                  <Button variant='outline-danger' size='sm' onClick={onDelete}>삭제</Button>
                </Col>
              </Row>
            }
            <Col>
              <Card className="text-center">
                <Card.Header>
                  <Badge bg='primary'>{id}</Badge>
                </Card.Header>
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>
                  {content}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Created on {formatDate(createdAt)} by {writer}
                </Card.Footer>
              </Card>
            </Col>
          </>
        }
      </Row>
    </div>
  )
}

export default PostDetail