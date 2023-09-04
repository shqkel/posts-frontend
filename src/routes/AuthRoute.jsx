import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContextProvider';
import { Alert } from 'react-bootstrap';

const AuthRoute = (props) => {
  const {states : {isLogin}, actions : {onLinkClick}} = useContext(AppContext);
  return (
      <React.Fragment>
        {
          isLogin ? 
            props.children : 
              <Alert variant='danger' className='text-center'>
                로그인후 사용가능합니다. 👩‍🦰
                <br />
                <Alert.Link href="/auth/login" onClick={onLinkClick}>로그인</Alert.Link>
              </Alert>
        }
      </React.Fragment>
  );
}

export default AuthRoute