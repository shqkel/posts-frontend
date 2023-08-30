import React from 'react'
import { Button, Container, Nav } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { AppContext } from '../contexts/AppContextProvider';
import { useContext } from 'react';

const Layout = () => {
  const {states : {isLogin, loginMember}, actions : {onLinkClick, logout, hasRole}} = useContext(AppContext);
  return (
    <>
      <Navbar collapseOnSelect expand="md" className='mb-3' bg="primary" data-bs-theme="dark" onClick={onLinkClick}>
        <Container>
          <Navbar.Brand href="/" data-to="/">리액트</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse >
            <Nav className="me-auto">
              <Nav.Link href="/" data-to="/" >Home</Nav.Link>
              <Nav.Link href="/posts">Posts</Nav.Link>
              {
                (isLogin && hasRole('ADMIN')) &&
                <Nav.Link href="/admin">Admin</Nav.Link>
              }
            </Nav>
            {
              isLogin ? (
                <Nav>
                  <Nav.Link href="/mypage">
                    <Button variant="outline-light" title={loginMember.sub}>마이페이지</Button>
                  </Nav.Link>
                  <Nav.Link>
                    <Button variant="outline-light" onClick={() => logout()}>Logout</Button>
                  </Nav.Link>
                </Nav> 
              ) : ( 
                <Nav>
                  <Nav.Link href="/login">
                    <Button variant="outline-light">Login</Button>
                  </Nav.Link>
                  <Nav.Link href="/join" >
                    <Button variant="outline-light">Join</Button>
                  </Nav.Link>
                </Nav>
              )
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="p-3">
        <Outlet/>
      </div>
    </>
  )
}

export default Layout