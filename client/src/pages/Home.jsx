import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useLocation, useParams } from 'react-router-dom'
import { MdLocationPin } from 'react-icons/md'
import { FaBusinessTime } from 'react-icons/fa'
import { CgCalendarDates } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { MdOutlineSort } from "react-icons/md";
import banner1 from "../assets/images/banner1.png"
export default function Home() {



    const [jobs, setJobs] = useState([]);


    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("latest");
    const [showSortOptions, setShowSortOptions] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const navigate = useNavigate()

    useEffect(() => {
        // Fetch jobs from your API
        axios.get(`http://localhost:8080/api/job/get-job?sort=${sortOption}&page=${currentPage}&search=${searchTerm}`)
            .then((res) => {
                setJobs(res.data.jobs)
                setTotalPages(res.data.numberOfPage);
                console.log(res.data)

            })
            .catch(error => console.error('Error fetching jobs:', error));
    }, [searchTerm, sortOption, currentPage]);

    const handleClick = (e) => {
        e.preventDefault()
        // setSearchTerm(e.target.search.value)
        setCurrentPage(1)
    }
    const handleSortOptionClick = (option) => {

        setSortOption(option);
        setShowSortOptions(false);
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <><div>
            <div className={`bg-banner1 bg-right bg-no-repeat bg-relative  bg-[#ecf5f3] sm:bg-contain sm:w-auto sm:h-[60vw]  `}>

                {/* <img src={Banner1} className="banner h-full" /> */}
                <nav className="text ">
                    <p className="  home pt-20  w-2/3 "><span>Find A</span> <span className="text-[#338573]">Job </span>That <span className="text-[#338573]">Matches</span> <span>Your</span> <span className="text-[#338573]"> Passion</span></p>

                    <p className="describe text-[#616161] text-xl text-bold"> Hand-picked opportunities to work from home, remotely, freelance, full-time, part-time, contract and internships.</p>


                    <form onSubmit={(e) => {
                        e.preventDefault()
                        setSearchTerm(e.target.search.value)
                        // navigate("/?search=" + e.target.search.value)


                    }}

                    >
                        <div className=" my-16 flex items-center  rounded-lg"> <input
                            name="search"
                            type="text"

                            className=" search sm:w-1/2 sm:h-30px md:h-40px  md:w-1/2 lg:w-1/3 px-4 py-3 rounded-l-lg focus:outline-none"
                            placeholder="Search................"
                        />
                            <button
                                className=" searchbutton bg-[#338573] hover:bg-blue-600 text-white px-4 py-3 rounded-r-lg"
                            >
                                Search
                            </button>  </div> </form>


                </nav>
                <div className="   my-10  p-4">

                </div>
            </div >
            <section className="container ">


                <div>
                    <div className='flex my-8 '>

                        <div className="   flex  text-right">
                            <button
                                onClick={() => setShowSortOptions(!showSortOptions)}

                                className=" sort flex h-14 rounded-md  px-4   lg:text-xl font-bold text-[#338573] focus:bg-gray-200"
                                id="options-menu"
                                aria-haspopup="true"
                                aria-expanded="true"
                            >
                                <MdOutlineSort size={40} /> <p className="hidden lg:flex px-2">Sort Jobs</p> {/* You can replace this with your desired sort icon */}
                            </button>

                            {showSortOptions && (
                                <div
                                    className="origin-top-right absolute  mt-16  rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="options-menu"
                                >
                                    <div className="details" role="none">
                                        <button
                                            onClick={() => handleSortOptionClick("latest")}

                                            className="block px-4 py-2 w-full text-sm text-gray-70 hover:text-gray-900"
                                            role="menuitem"
                                        >
                                            Latest Jobs
                                        </button>
                                        <button
                                            onClick={() => handleSortOptionClick("a-z")}
                                            className="block  px-4 py-2 text-sm text-gray-70 hover:text-gray-900"
                                            role="menuitem"
                                        >
                                            A to Z
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <h2 className='  list text-[ #000000] sm:mx-0.5 md:mx-1 lg:mx-16 xl:mx-64 sm:text-sm lg:text-xl xl:text-4xl' >All Popular list</h2>

                    </div>



                    <ul className="  px-2 py-10 ">
                        {jobs.map(job => (
                            <li key={job._id} className='py-5'>

                                <nav className="  border-4 rounded-lg  shadow-md   md:px-12    py-4 flex justify-between">
                                    <div className="flex gap-8 px-2 ">
                                        <p className=' hidden sm:inline lg:block text-white  py-5 text-center text-6xl  font-bold bg-[#338573] w-28 h-28 rounded-full'> J</p>
                                        <div className='  gap-4 justify-content '> <p className="company ">{job.company} </p>
                                            <h3 className="position">{job.position}</h3>

                                            <div className="   jobdetail  flex gap-5">
                                                <p className=" flex gap-1"><MdLocationPin size={20} color="#338573" />{job.Location}</p>
                                                <p className=" hidden lg:flex gap-1"><FaBusinessTime size={20} color="#338573" /> {job.Type}</p>
                                                <p className=" hidden  xl:flex gap-1"><CgCalendarDates size={20} color="#338573" />{job.createdAt.split("T")[0]}</p></div></div>
                                        <div>
                                        </div>

                                    </div>
                                    <Link to={`/jobs/${job._id}`} > <button className="button  view hover:bg-blue-500   ">View Details</button></Link>
                                </nav>

                            </li>
                        ))}
                    </ul>

                </div>


                <div className="my-4 flex justify-center">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="bg-[#338573] text-white font-bold py-1 px-2 rounded-l"
                    >
                        Previous
                    </button>
                    <p className="mx-2 my-2">{`Page ${currentPage} of ${totalPages}`}</p>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="bg-[#338573] text-white font-bold py-1 px-4 rounded-r"
                    >
                        Next
                    </button>
                </div>



                <div>

                </div>

            </section>




        </div>
        </>
    )

}