import React from 'react'
import Banner1 from "../assets/images/banner1.png"
export default function Home() {
    return (
        <>
            <div className={`bg-banner1  bg-contain h-[80vh] bg-right bg-no-repeat bg-[#ecf5f3] `}>

                {/* <img src={Banner1} className="banner h-full" /> */}
                <nav className="container ">
                    <p className="  home mx-10 pt-20  w-2/3"><span>Find A</span> <span className="text-[#338573]">Job </span>That <span className="text-[#338573]">Matches</span> <span>Your</span> <span className="text-[#338573]"> Passion</span></p>
                    <p className="mx-10 text-xl"> Hand-picked opportunities to work from home, remotely, freelance, full-time, part-time, contract and internships.</p>
                </nav>
                <div className=" my-10 container p-4">
                    <div className=" mx-8 flex items-center  rounded-lg">
                        <input
                            type="text"
                            className=" w-1/3 px-4 py-3 rounded-l-lg focus:outline-none"
                            placeholder="Search................"
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-r-lg"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div >








        </>
    )
}
