import React, { useContext, useState } from 'react'
import {Alert, Button, Col, Form, Row} from 'react-bootstrap'
import {AppContext} from '../../contexts/AppContextProvider'

const Login = () => {
  const {actions : {login}} = useContext(AppContext);
  const [frm, setFrm] = useState({
    memberId : 'honggd',
    password : '1234'
  });
  const [authError, setAuthError] = useState(null);

  const {memberId, password} = frm;

  const onFrmChange = (e) => {
    setFrm({
      ...frm,
      [e.target.name] : e.target.value
    })
  };

  const onFrmSubmit = (e) => {
    e.preventDefault();
    login(frm).catch(err => {
      // console.log(err); 
      setAuthError(err.response.data); // {msg: '아이디 또는 비밀번호가 일치하지 않습니다.'}
    });
    setAuthError(null);
  }

  return (
    <div>
      <h1>Login</h1>
      {
        authError && 
        <Row>
          <Col md={{ span: 6, offset: 3 }}s>
            <Alert variant='danger'>
              {authError.msg}
            </Alert>
          </Col>
        </Row>
      }
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={onFrmSubmit}>
            <Form.Group controlId="formMemberId" className='mb-3'>
              <Form.Label>아이디</Form.Label>
              <Form.Control type="text" name='memberId' placeholder="아이디..." value={memberId} onChange={onFrmChange}/>
            </Form.Group>

            <Form.Group controlId="formPassword" className='mb-3'>
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" name="password" placeholder="비밀번호..." value={password} onChange={onFrmChange}/>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login