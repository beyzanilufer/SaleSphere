import './App.css'
import { Routes, Route, redirect } from 'react-router-dom'
import About from './pages/About';
import NotFoundPage from './pages/NotFoundPage';
import Logout from './pages/Logout';
import Home from './pages/Home';
import Header from './component/Header';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import PageContainer from './container/PageContainer';
import Business from './pages/Business';
import ArticleReport from './pages/ArticleReport';
import OrderReport from './pages/OrderReport';
import Company from './pages/Company';
import MainGroup from './pages/MainGroup';
import Groups from './pages/Groups';
import Department from './pages/Department';
import Articles from './pages/Articles';
import OrderList from './pages/OrderList';
import NewBusiness from './component/NewBusiness';
import OrderRequest from './pages/OrderRequest';
import Products from './pages/Products';
import Basket from './pages/Basket';






function App() {


  const [isLogin, setIsLogin] = useState(true);



  return (
    <div>
      <div>
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <div>
            
            <Header setIsLogin={setIsLogin} />
            
            <PageContainer>
            
            <Routes>
              <Route path='/home' element={<Home setIsLogin={setIsLogin}/>} />
              <Route path='/about' element={<About />} />
              <Route path='*' element={<NotFoundPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/business' element={<Business/>}/>
              <Route path='/articleReport' element={<ArticleReport/>}/>
              <Route path='/orderReport' element={<OrderReport/>}/>
              <Route path='/orderList' element={<OrderList/>}/>
              <Route path='/orderRequest' element={<OrderRequest/>}/>
              <Route path='/company' element={<Company/>}/>
              <Route path='/mainGroup' element={<MainGroup/>}/>
              <Route path='/groups' element={<Groups/>}/>
              <Route path='/department' element={<Department/>}/>
              <Route path='/articles' element={<Articles/>}/>
              <Route path='/newBusiness' element={<NewBusiness/>}/>
              <Route path='/products/:cartid' element={<Products/>}/>
              <Route path='/basket/:cartid' element={<Basket/>}/>
              

            </Routes>
            </PageContainer>
          </div>
        )}
      </div>




    </div>


  )
}


export default App;