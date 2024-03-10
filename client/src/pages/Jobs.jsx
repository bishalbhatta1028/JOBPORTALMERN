import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addJob } from '../redux/slice/jobSlice'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../components/Footer'
function SingleJobDetails() {

    const [job, setJob] = useState({});



    const dispatch = useDispatch();
    const navigate = useNavigate()
    const jobs = useSelector((state) => state.action);
    const reduxUser = useSelector((reduxStore) => { return reduxStore.user.value })
    const { id } = useParams()


    useEffect(() => {
        //     // Fetch jobs from your API
        axios.get(`http://localhost:8080/api/job/get-singlejob/${id}`)
            .then((res) => setJob(res.data))

            .catch(error => console.error('Error fetching jobs:', error));
    }, []);

    function addtojob(e) {
        e.preventDefault()


        if (reduxUser.role == "applicant") {
            navigate("/appliedjobs")
            dispatch(addJob({ job }))
        } else {
            toast.error("unble to access")
        }

    }






    return (<>


        <div className="bg-[#F4F5F7] h-20" ><nav className="container  flex  justify-center"><p className=" singlecompany ">{job.position}<span className='type  text-lg '>({job.Type})</span>-<span>{job.company}</span></p></nav></div>
        {reduxUser?.role == "applicant"
            &&
            <Link to="/appliedjobs" className='container flex justify-center my-4' > <button onClick={addtojob} className=" button w-32 text-lg hover:bg-blue-500  py-auto  " >Apply This Job</button></Link>
        }
        <div className=" my-28  container  ">
            <div className=" relative  border-4 rounded-lg  shadow-md">
                <p className="title">Minimum Qulification : <span className="details ">{job.qualification}</span></p>
                <p className="title ">Experience :<span className="details">{job.experience}</span></p>
                <p className="title ">Location : <span className="details">{job.Location}</span> </p>
                <p className="title ">Salary : <span className="details">{job.salary}</span></p>
                <p className="title ">Posted On: <span className="details">{job.createdAt?.split("T")[0]}</span></p>
                <p className="title ">Application Deadline: <span className="details">{job.deadline?.split("T")[0]}</span></p>
                <p className="title ">Vacancy Number: <span className="details">{job.vacancy}</span></p>

                {/* Render other job details as needed */}
                <div className="title ">Job Description : <div className="details">{job.jobDescription}</div> </div>
                <div className="title ">Job Requirement : <div className="details">{job.jobRequirement}</div></div>

            </div >
        </div>




    </>

    )
}

export default SingleJobDetails 