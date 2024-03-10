import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import setReduxUser, { logoutReduxUser } from '../redux/slice/userSlice.js'
import { FaHome } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import UserProfileMenu from './UserProfile.jsx';
import { useNavigate } from 'react-router-dom'
export default function Navbar({ user }) {


    const { pathname } = useLocation()
    const reduxUser = useSelector((reduxStore) => { return reduxStore.user.value })
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const handleLogout = () => {
        // e.preventDefault()
        dispatch(logoutReduxUser())
        navigate("/login")
    }


    return (
        <>

            <header className=' navbar overflow-hidden  bg-white w-auto  sm:p-1  '>
                <div className="sm:ml-10 md:ml-10 lg:ml-16 flex items-center justify-between  gap-10    lg:p-1">
                    <div className="flex "><Link to="/">
                        <div className="py-5 mx-2">

                            <FaHome size={32} color='#338573' />
                        </div></Link> <p className="  hidden text-[#338573]   sm:inline sm:mx-1 sm:mt-1 md:text-3xl my-5 md:mx-3 font-bold lg:block ">JobPortal</p></div>


                    <div className='mainicon'>
                        <div className="flex  ">
                            {reduxUser &&

                                <UserProfileMenu />
                            }
                            {
                                reduxUser ? <button onClick={handleLogout} className='button  mx-10 hover:bg-blue-500'>< Link to='/' >Logout</Link></button> :
                                    <nav className="">
                                        {(!reduxUser) && < Link to='/login' >  <button className="button hover:bg-blue-500 sm:my-1 sm:mx-1 md:mx-1  mx-4 my-2 ">Login</button></Link>}
                                        <button className=' button  register hover:bg-blue-500 sm:pl-4 '>< Link to='/register' >Register</Link></button></nav>
                            }
                        </div>
                    </div>
                </div>

            </header >

        </>
    )
}
