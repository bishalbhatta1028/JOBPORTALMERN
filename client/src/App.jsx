import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './App.css'

import UploadJobs from './pages/UploadJobs'
import FindJobs from './pages/FindJobs'
import Company from './pages/Company'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'


function App() {


  return (
    <>


      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/findjobs" element={<FindJobs />} />
          <Route path="/uploadjobs" element={<UploadJobs />} />
          <Route path="/company" element={<Company />} />
          <Route path="/about" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<About />} />
          <Route path="*" element={<NotFound />} />


        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
