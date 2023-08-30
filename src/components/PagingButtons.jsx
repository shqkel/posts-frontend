import React, { useContext } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { PostContext } from '../contexts/PostContextProvider';

const PagingButtons = () => {
  const {states : {page, totalPages}, actions : {setPage}} = useContext(PostContext);
  return (
    <Row>
      <Col>
          <Button disabled={page === 0} onClick={() => setPage(page - 1)}>이전</Button>
          <span className="mx-3">{page + 1} / {totalPages}</span>
          <Button disabled={page === totalPages - 1} onClick={() => setPage(page + 1)}>다음</Button>
      </Col>
    </Row>
  )
}

export default PagingButtons