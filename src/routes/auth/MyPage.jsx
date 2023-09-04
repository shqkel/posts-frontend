import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../contexts/AppContextProvider';
import { Col, Row, Table } from 'react-bootstrap';
import { formatDate } from '../../utils/Utils';

const MyPage = () => {
  const {actions : {getMyPage}} = useContext(AppContext);
  const [user, setUser] = useState({
    id : '',
    name : '',
    email : '',
    birthday : ''
  });
  useEffect(() => {
    getMyPage().then((data) => {
      console.log(data);
      const {member} = data;
      setUser(member);
    });
  }, []);
  const {id, name, email, birthday} = user;
  return (
    <div>
      <h1>마이페이지</h1>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Table striped="columns">
            <tbody>
              <tr className="border border-start-0 border-end-0">
                <th>회원번호</th>
                <td>{id}</td>
              </tr>
              <tr className="border border-start-0 border-end-0">
                <th>이름</th>
                <td>{name}</td>
              </tr>
              <tr className="border border-start-0 border-end-0">
                <th>이메일</th>
                <td>{email}</td>
              </tr>
              <tr className="border border-start-0 border-end-0">
                <th>생일</th>
                <td>{formatDate(birthday)}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  )
}

export default MyPage