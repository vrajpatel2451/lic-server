import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Admin from './pages/admin'
import AdminLogs from './pages/adminLogs'
import Client from './pages/client'
import ClientDetails from './pages/clientDetails'
import FilePriviewPage from './pages/FilePriview'
import Head from './pages/head'
import Home from './pages/home'
import Login from './pages/login'
import Staff from './pages/staff'
import StaffLogs from './pages/staffLogs'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const RouterMain = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.auth);
  console.log('ahhah');
  return (
    <>
    <Routes>
      <Route path='/login' element={<PublicRoute Component={Login} store={{state,dispatch}}/>}/>
      <Route path='/client' element={<PrivateRoute Component={Client} store={{state,dispatch}}/>}/>
      <Route path='/logs/admin' element={<PrivateRoute Component={AdminLogs} store={{state,dispatch}}/>}/>
      <Route path='/staff' element={<PrivateRoute Component={Staff} store={{state,dispatch}}/>}/>
      <Route path='/admin' element={<PrivateRoute Component={Admin} store={{state,dispatch}}/>}/>
      <Route path='/head' element={<PrivateRoute Component={Head} store={{state,dispatch}}/>}/>
      <Route path='/client/:id/pdf' element={<PrivateRoute Component={FilePriviewPage} store={{state,dispatch}}/>}/>
      <Route path='/staff/:id/logs' element={<PrivateRoute Component={StaffLogs} store={{state,dispatch}}/>}/>
      <Route path='/client/:id' element={<PrivateRoute Component={ClientDetails} store={{state,dispatch}}/>}/>
      <Route path='/' element={<PrivateRoute Component={Home} store={{state,dispatch}}/>}/>
                  {/* <PrivateRoute path="/" component={<Home />} store={{state,dispatch}} />
                  <PrivateRoute path="/client" component={<Client />} store={{state,dispatch}}/>
                  <PrivateRoute path="/staff" component={<Staff />} store={{state,dispatch}}/>
                  <PrivateRoute path="/admin" component={<Admin />} store={{state,dispatch}}/>
                  <PrivateRoute path="/head" component={<Head />} store={{state,dispatch}}/>
                  <PrivateRoute path="/client/:id" component={<ClientDetails />} store={{state,dispatch}}/> */}
                  {/* <PublicRoute path="/login" Component={Login} store={{state,dispatch}}/> */}
                </Routes>
    </>
  )
}

export default RouterMain