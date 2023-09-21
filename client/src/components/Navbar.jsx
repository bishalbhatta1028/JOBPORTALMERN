import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <>

            <header className=' navbar relative bg-[#f7fdfd] w-auto'>
                <div className=" container mx-auto flex item -center justify-between p-5">
                    <p className=" text-[#338573]  text-3xl mx-10 my-5 font-bold  ">JobPortal</p>
                    <nav className='my-4'>
                        <ul className='flex gap-8'>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/findjobs">Find Jobs</Link>
                            </li>
                            <li>
                                <Link to="/company">Companies</Link>
                            </li>
                            <li>
                                <Link to="/uploadjobs">Upload Job</Link>
                            </li>
                            <li>
                                <Link to="/about">About Us</Link>
                            </li>
                        </ul>
                    </nav>
                    <nav className="">  <button className="button hover:bg-blue-500 mx-3 my-3 ">Login</button>
                        <button className='button  hover:bg-blue-500 '>Register</button></nav>
                </div>

            </header >
        </>
    )
}
