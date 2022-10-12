import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './pages/admin'
import Client from './pages/client'
import ClientDetails from './pages/clientDetails'
import Head from './pages/head'
import Home from './pages/home'
import Login from './pages/login'
import Staff from './pages/staff'

const RouterMain = () => {
  return (
    <>
    <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/client" element={<Client />} />
                  <Route path="/staff" element={<Staff />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/head" element={<Head />} />
                  <Route path="/client/:id" element={<ClientDetails />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
    </>
  )
}

export default RouterMain