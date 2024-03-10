// import React from 'react'

// export default function PostedJob() {
//     return (
//         <div>PostedJob</div>
//     )
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

// const navigate = useNavigate()
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import DeleteConfirmation from "../components/Delete"
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../components/Footer';

const PostedJob = (job) => {
    const jobItems = useSelector((reduxStore) => { return reduxStore.job.jobItems })
    const [jobData, setJobData] = useState("");
    const [error, setError] = useState("");
    const reduxUser = useSelector((reduxStore) => { return reduxStore.user.value })
    const jobs = useSelector((state) => state.action);
    const { id } = useParams
    // const history = useHistory();
    // console.log(id)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/job/get-job/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                });
                setJobData(response.data);
                // console.log("response", response.data)
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();

    }, [id]);

    function handleDelete(e) {

        axios.delete(`http://localhost:8080/api/job/delete-job/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            toast.success("job deleted  Successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate("/postedjobs")
            console.log("data deleted")
        }).catch((err) => {
            //console.log('login failed')
            toast.error(err.response.data.msg)

        })

    }


    if (!jobData) {
        return <div className="h-[81vh]"><div className="title container my-5 border-4 rounded-lg  shadow-md text-center"> ......Loading.......</div></div>
    }
    if (error || jobData == '') {
        return <div className="title container my-5 border-4 rounded-lg  shadow-md text-center"> No Job Posted Yet</div>;
    }

    return (<>



        <div className=" py-8 bg-[#F4F5F7]">

            <h2 className="text-center text-2xl font-bold leading-6 tracking-tight text-green-800  " >
                Posted Jobs
            </h2>
        </div>


        <div className="my-5 h-[77vh]">

            <div className=" sm:mx-0.5 xl:mx-10">
                <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className=" mx-2 text-xl text-gray-700 Camelcase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="">
                            <th scope="col" className="title1">
                                Company
                            </th>
                            <th scope="col" className=" title1">
                                Job Title
                            </th>
                            <th scope="col" className=" title1">
                                <p>Job<span>Type</span></p>
                            </th>
                            <th scope="col" className=" title1">
                                Location
                            </th>
                            <th scope="col" className=" title1">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        {jobData.map(job => {
                            return <tr key={job._id} className="  bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th className="   py-4 details1   ">
                                    {job.company}
                                </th>
                                <td className="  details1">

                                    {job.position}
                                </td>
                                <td className="details1">
                                    {job.Type}
                                </td>
                                <td className=" details1">
                                    {job.Location}
                                </td>
                                <td className=" details1" id="icons">
                                    {/* {job._id} */}
                                    <Link to={`/jobs/${job._id}`} > <button className=" pl-2 "><FaEye color='#338573' size={18} /></button></Link>
                                    {/* <button className="  " onClick={handleDeleteJob}><RiDeleteBin6Line color='#338573' size={18} /></button> */}
                                    <Link to={`/delete-job/${job._id}`} >
                                        <button onClick={handleDelete} className="  px-2" ><RiDeleteBin6Line color=' #FA0606' size={18} /></button></Link>
                                    <Link to={`/update-job/${job._id}`} >  <button className="  px-2" ><MdEdit color=' #04BCF6' size={18} /></button></Link>


                                </td>
                            </tr>
                        })}


                    </tbody>
                </table>
            </div>
        </div>




        {/* <div>
                {jobData.map(job => {
                    return <div key={job._id}>
                        <p>{job.company}</p>
                    </div>


                })}
              
            </div> */}

    </>
    );
}



export default PostedJob;
