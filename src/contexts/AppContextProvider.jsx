import React, { createContext, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";

export const AppContext = createContext();

/**
 * api요청 공통처리
 */
export const api = axios.create({
  // baseURL: 'your_api_base_url',
});

// Intercept requests to add the access token
api.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken")
    config.headers.Authorization = `Bearer ${accessToken}`;
    console.log('request with accessToken : ', accessToken.substring(accessToken.length - 5));
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept responses to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    const {data : {error_message}, status} = error.response;
    // jwt인증오류가 아닌 security가 던진 403은 error_message가 없다.
    if(status === 403 && error_message?.includes('The Token has expired')) {
      try {
        const newAccessToken = await refreshAccessToken(); // Replace with your token refresh function
        // Retry the failed request with the new access token
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(error.config); // 재요청
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login)
        // You may also want to clear user data and log them out
        // if the refresh token is no longer valid.
        handleRefreshTokenFailure(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  return await axios.post(`/auth/token`, {refreshToken})
            .then(response => {
              // console.log(response);
              const {data} = response;
              setAuthenticaionToStorage(data);
              return data.accessToken;
            });
}

const handleRefreshTokenFailure = (err) => {
  console.log(err);
  alert('토큰이 만료되었습니다. 다시 로그인해주세요 👩‍🦳');
  sessionStorage.removeItem("loginMember"); 
  sessionStorage.removeItem("accessToken"); 
  sessionStorage.removeItem("removeToken"); 
  window.location.href = "/login";
}

const setAuthenticaionToStorage = ({accessToken, refreshToken}) => {
  console.log('AccessToken Updated! : ', accessToken.substring(accessToken.length - 5));
  sessionStorage.setItem('accessToken', accessToken);  
  sessionStorage.setItem('refreshToken', refreshToken);
  const decoded = jwt_decode(accessToken); // token decoding  {sub: 'honggd', iss: 'http://localhost:8080/auth/login', exp: 1692718336, authorities: Array(1), username: 'honggd'}
  sessionStorage.setItem("loginMember", JSON.stringify(decoded)); 
  
}

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);
  const [loginMember, setLoginMember] = useState(JSON.parse(sessionStorage.getItem("loginMember")));

  useEffect(() => {
    // 페이지 새로고침시 적용
    if(loginMember)
      setLogin(true); 
  }, [loginMember]);
  /**
   * 전역 a link handler
   * - href속성으로 react navigate 처리
   */
  const onLinkClick = (e) => {
    e.preventDefault(); // a태그 페이지이동 방지
    // href로부터 origin(http://localhost:3000)제거후 path가져오기 
    // a>img태그를 클릭한 경우 부모태그로 부터 href 조회
    const target = (
      e.target.href ? 
        e.target : 
          ((target) => {
            while((target = target.parentElement))
              if(target.href)
                return target;
          })(e.target)
    );
    if(target) {
      navigate(target.href.replace(window.location.origin, ""));
    }
  };


  /**
   * bearer token이 필요없는 요청
   */
  const login = async (frm) => {
    return await axios.post(`/auth/login`, frm)
                  .then(response => {
                    const {data} = response;
                    console.log(data);
                    setAuthenticaionToStorage(data)
                    setLoginMember(JSON.parse(sessionStorage.getItem("loginMember")));
                    setLogin(true);
                    navigate('/');
                  });
  }
  
  const logout = () => {
    setLogin(false);
    setLoginMember(null);
    sessionStorage.removeItem("loginMember");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    navigate('/');
  }
  const hasRole = (roleName) => {
    if(!isLogin) return false;
    if(!loginMember) return false;
    const authorities = loginMember.authorities;
    return authorities.some((authority) => authority === `ROLE_${roleName}`)
  }

  

  const getForPost = async () => {
    return await api.get(`/post`)
                      .then(response => response.data);
  };
  const getForAdmin = async () => {
    return await api.get(`/admin`).then(response => response.data);
  }
  const value = {
    states: {
      loginMember, 
      isLogin
    },
    actions: {
      onLinkClick,
      login, 
      logout, 
      hasRole, 
      getForPost, 
      getForAdmin
    }
  };
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider