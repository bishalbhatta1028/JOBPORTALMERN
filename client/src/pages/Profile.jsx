import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import setReduxUser, { logoutReduxUser } from '../redux/slice/userSlice.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Profile() {
    const reduxUser = useSelector((reduxStore) => { return reduxStore.user.value })
    const dispatch = useDispatch()
    if (reduxUser) {
        return (
            <>
                <div className='h-[85vh]'> <div className="  py-8 bg-[#F4F5F7]">

                    <h2 className="text-center text-2xl font-bold leading-6 tracking-tight text-green-800  " >
                        My Profile
                    </h2>
                </div >
                    <section className=" ">          <div className="container  my-5 border-4 rounded-lg  shadow-md "> {reduxUser &&
                        < nav className=""><p className="title text-[#338573] ">Name:<span className="details text-black ">{reduxUser.name}</span></p>
                            <p className="title text-[#338573] ">Email:<span className=" details email text-black ">{reduxUser.email}</span></p>
                            <p className="title text-[#338573]">Role:<span className="details text-black ">{reduxUser.role}</span></p></nav>

                    }
                    </div ></section>
                </div>


            </>
        )
    }

}
