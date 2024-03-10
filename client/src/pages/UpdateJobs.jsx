
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../components/Footer';

function UpdateJobs() {
    let initialState = {
        company: '',
        position: '',
        Type: '',
        location: '',
        experience: '',
        qualification: '',
        jobRequirement: '',
        jobDescription: '',
        salary: '',
        vacancy: '',
        deadline: '',
    }
    const [data, setData] = useState({
        initialState
    });

    const [error, setError] = useState('');
    const [job, setJob] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()

    const jobs = useSelector((state) => state.job.jobItems)

    useEffect(() => {
        // Fetch jobs from your API
        axios
            .get(`http://localhost:8080/api/job/get-singlejob/${id}`)
            .then((res) => {

                setData({
                    company: res.data.company,
                    position: res.data.position,
                    Type: res.data.Type,
                    Location: res.data.Location,
                    experience: res.data.experience,
                    qualification: res.data.qualification,
                    jobRequirement: res.data.jobRequirement,
                    jobDescription: res.data.jobDescription,
                    salary: res.data.salary,
                    vacancy: res.data.vacancy,
                    deadline: res.data.deadline,
                });
            })
            .catch((error) => console.error('Error fetching jobs:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        axios
            .patch(`http://localhost:8080/api/job/update-job/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            })
            .then((res) => {
                toast.success('Job updated successfully');
                setData(
                    initialState
                    // company: '',
                    // position: '',
                    // Type: '',
                    // location: '',
                    // experience: '',
                    // qualification: '',
                    // jobRequirement: '',
                    // jobDescription: '',
                    // salary: '',
                    // vacancy: '',
                    // deadline: '',
                )
                navigate('/postedjobs')
            })
            .catch((err) => {
                console.log(err.response.data.message);

                if (err.response.status === 400) {
                    let errors = err.response.data.errors;
                    let temp = {};
                    errors.forEach((validationError) => {
                        temp[validationError.param] = validationError.msg;
                    });

                    setError(temp);
                } else {
                    toast.error('Something went wrong');
                }
            });
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: '' });
    };

    return (

        <>

            <div className=" no-scrollbar min-h-full flex-1 flex-col justify-center ">
                <div className=" py-8 bg-[rgb(244,245,247)]">

                    <h2 className=" text-center text-2xl font-bold leading-6 tracking-tight text-gray-800  " >
                        Update Your Job
                    </h2>
                </div>
            </div>

            <form className="container   " onSubmit={handleSubmit}>


                <div className="container gap-8 px-2 " >
                    <div className="">
                        <div className=" absoulte sm:col-span-4 py-6" >
                            <label htmlFor="company" className="after:content-['*'] after:ml-0.5 after:text-red-500 text-lg font-bold leading-32 text-gray-900">
                                Company Name
                            </label>
                            <div className="mt-2">
                                <div className=" flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">

                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="company"
                                        value={data.company}
                                        // value="google"
                                        className=" flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-12 px-2"
                                        placeholder="Name *"

                                    />

                                </div>
                                <small className="text-red-600">{error.company}</small>
                            </div>
                        </div>

                        <div className=" sm:col-span-4 py-4" >
                            <label htmlFor="postion" className="after:content-['*'] after:ml-0.5 after:text-red-500 text-lg font-bold leading-6">
                                Job Title
                            </label>
                            <div className="mt-2">
                                <div className=" flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-full">

                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="position"
                                        value={data.position}

                                        className=" flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-12"
                                        placeholder="Title *"
                                    />
                                </div>
                                <small className="text-red-600">{error.position}</small>

                            </div>
                        </div>


                        <div className=" sm:col-span-4 py-4">
                            <label htmlFor="jobType" className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-lg font-bold leading-6 text-gray-900">
                                Job Type
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">

                                    <input
                                        onChange={handleChange}
                                        type="string"
                                        name="Type"
                                        value={data.Type}
                                        className=" flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg  sm:leading-12 px-2"
                                        placeholder="Type *"
                                    />


                                </div>
                                <small className="text-red-600">{error.Type}</small>
                            </div>
                        </div>
                        <div className="  sm:col-span-4 py-4">
                            <label htmlFor="location" className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-lg font-bold leading-6 text-gray-900">
                                Job Location
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">

                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="Location"
                                        value={data.Location}
                                        className=" flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-12"
                                        placeholder="Location*"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="sm:col-span-6 py-8">
                                <label htmlFor="salary" className="block text-lg font-bold leading-6 text-gray-900">
                                    Salary Range
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">

                                        <input
                                            onChange={handleChange}
                                            type="num"
                                            name="salary"
                                            value={data.salary}
                                            className=" flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-12"
                                            placeholder="Salary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-4 py-4">
                                <label htmlFor="vacancyNumber" className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-lg font-bold leading-6 text-gray-900">
                                    Vacancy Number
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">

                                        <input
                                            onChange={handleChange}
                                            type="integer"
                                            name="vacancy"
                                            value={data.vacancy}
                                            className=" flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-12"
                                            placeholder="0000"
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="  sm:col-span-4 py-4 ">
                                <label htmlFor="Experience" className="block text-lg font-bold leading-6 text-gray-900">
                                    Experience
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">

                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            name="experience"
                                            value={data.experience}
                                            className=" flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-12"
                                            placeholder="Experience"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className=" sm:col-span-4 py-4">
                                <label htmlFor="qualification" className="block text-lg font-bold leading-6 text-gray-900">
                                    Qualification
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">

                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            name="qualification"
                                            value={data.qualification}
                                            className=" flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-12"
                                            placeholder="Qualification"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="  sm:col-span-4 py-4 ">
                            <label htmlFor="Deadline" className="block text-lg font-bold leading-6 text-gray-900">
                                Application Deadline
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">

                                    <input
                                        onChange={handleChange}
                                        type="date"
                                        name="deadline"
                                        value={data.deadline}
                                        className=" flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg sm:leading-12"
                                        placeholder="Application Deadline"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className=" col-span-4 my-4">
                            <label htmlFor="jobRequirement" className="block no-scrollbar after:content-['*'] after:ml-0.5 after:text-red-500 text-lg font-bold leading-6 text-gray-900">
                                Job Requirements
                            </label>
                            <div className="mt-2">
                                <textarea
                                    onChange={handleChange}
                                    name="jobRequirement"
                                    value={data.jobRequirement}
                                    rows={8}
                                    className=" w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-12"
                                    // defaultValue={''}

                                    placeholder="Job Requirements Here"
                                />
                            </div>
                        </div>
                        <div className="   col-span-4 py-4 ">
                            <label htmlFor="jobDescription no-scrollbar" className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-lg font-bold leading-6 text-gray-900">
                                Job Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    onChange={handleChange}
                                    name="jobDescription"
                                    value={data.jobDescription}
                                    rows={8}
                                    className="  w-full  rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-12"
                                    // defaultValue={''}

                                    placeholder="Job  Description Here"
                                />
                            </div>
                        </div>
                    </div>


                </div >
                {/* <Link to={`/postedjobs`} className="my-4 flex  justify-end"> */}
                <button type="submit" className="button view   mx-auto my-10 flex justify-center py-2" >Update  Job</button>
                {/* </Link> */}

            </form >

            <Footer />
        </>
    );
}

export default UpdateJobs;
