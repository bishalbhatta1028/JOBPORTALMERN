import React from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setReduxUser } from '../redux/slice/userSlice';
import { useDispatch } from 'react-redux';

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.email.value)
        axios.post("http://localhost:8080/api/auth/login", {

            "email": e.target.email.value,
            "password": e.target.password.value
        }).then((res) => {
            // console.log("login successful")
            toast.success("Login Successful", {
                position: "top-right",
                autoClose: 10,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch(setReduxUser(res.data.user))
            localStorage.setItem("access_token", res.data.token)
            navigate("/")
        }).catch((err) => {
            console.log(err)
            toast.error(err.response.data.msg, {
                autoClose: 100,
            })

        })
    }
    return (
        <>

            <div className=" py- 8 flex min-h-full flex-1 flex-col justify-center ">
                <div className=" py-8 bg-[#F4F5F7]">

                    <h2 className="text-center text-2xl font-bold leading-6 tracking-tight text-gray-800  " >
                        Login
                    </h2>
                </div>

                <div className=" mx-auto my-auto   pt-16 h-[80vh]  sm:w-full md:w-1/3  lg:w-1/3">
                    <form className="  space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="  block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className=" sm:my-4 mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="something@gmaii.com"
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#338573] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#338573] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-[#338573] hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="password"
                                    required
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button

                                type="submit"
                                // onSubmit={handleSubmit}
                                className="flex w-full justify-center rounded-md bg-[#338573] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Log in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

