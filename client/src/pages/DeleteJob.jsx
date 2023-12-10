
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import DeleteConfirmation from "../components/Delete"
import { addJob } from '../redux/slice/jobSlice'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
export default function DeleteJob() {

    const [job, setJob] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const jobs = useSelector((state) => state.action);
    const reduxUser = useSelector((reduxStore) => { return reduxStore.user.value })
    const { id } = useParams()


    // useEffect(() => {
    //     //     // Fetch jobs from your API
    //     axios.get(`http://localhost:8080/api/job/get-singlejob/${id}`)
    //         .then((res) => setJob(res.data))

    //         .catch(error => console.error('Error fetching jobs:', error));
    // }, []);

    function handleDelete(e) {





        axios.delete(`http://localhost:8080/api/job/delete-job/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((res) => {
            toast.success("job deleted  Successfully", {
                position: "top-right",
                autoClose: 5,
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
    return (<>
        {/* <div>DeleteJob</div> */}
        <div className=" h-[80vh]">
            <div className="title container my-5 border-4 rounded-lg  shadow-md text-center">    {
                reduxUser?.role == "recruiter"
                &&

                <DeleteConfirmation onDelete={handleDelete} />
            } </div>
        </div>


    </>)
}
