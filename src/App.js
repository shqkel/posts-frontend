import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import Home from './routes/Home';
import PostList from './routes/post/PostList';
import PostCreate from './routes/post/PostCreate';
import PostDetail from './routes/post/PostDetail';
import PostUpdate from './routes/post/PostUpdate';
import PageNotFound from './routes/PageNotFound';
import Login from './routes/auth/Login';
import Join from './routes/auth/Join';
import AuthRoute from './routes/AuthRoute';

function App() {
  return (
    <>
      <Routes>
        {/* Layout 컴포넌트를 외부가 아닌 부모 Route에 작성해야 Outlet태그에 부모div를 감싸 렌더할수 있다 */}
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/posts" element={<PostList/>}/>
          <Route path="/posts/create" element={<AuthRoute><PostCreate/></AuthRoute>}/>
          <Route path="/posts/detail/:id" element={<PostDetail/>}/>
          <Route path="/posts/update/:id" element={<AuthRoute><PostUpdate/></AuthRoute>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/join" element={<Join/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
