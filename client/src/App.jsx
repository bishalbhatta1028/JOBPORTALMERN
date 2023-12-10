import axios from 'axios'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import UserProfileMenu from './components/UserProfile'
import './App.css'
import { useState } from 'react'
import UploadJobs from './pages/UploadJobs'
import DeleteJob from './pages/DeleteJob'
import SingleJobDetails from './pages/Jobs'
import PostedJob from './pages/PostedJob'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { ToastContainer } from "react-toastify"
import { setReduxUser } from './redux/slice/userSlice'
import { useDispatch } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute'
import AppliedJob from './pages/AppliedJob'
import UpdateJobs from './pages/UpdateJobs'
import Delete from './pages/DeleteJob'



function App() {

  const [user, setUser] = useState("");
  const dispatch = useDispatch()
  let token = localStorage.getItem("access_token")


  try {
    if (token) {
      axios.get("http://localhost:8080/api/user/get-user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        dispatch(setReduxUser(res.data))
      })


    }
  } catch (error) {

  }


  return (
    <>


      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />}>
            {/* <Route path="/jobs/?" element={<Home />} /> */}
          </Route>
          <Route path="/jobs" element={<SingleJobDetails />} />
          <Route path="/jobs/:id" element={<SingleJobDetails />} />
          <Route path="/uploadjobs" element={<ProtectedRoute />} role="recruiter" >
            <Route path='' element={<UploadJobs />}
            />
          </Route>
          <Route path="/appliedjobs" element={<ProtectedRoute />} role="applicant">
            <Route path="" element={<AppliedJob />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/postedjobs" element={<PostedJob />} />
          <Route path="/update-job/:id" element={<UpdateJobs />} />
          <Route path="/delete-job/:id" element={<DeleteJob />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />


        </Routes>
        <ToastContainer />
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
