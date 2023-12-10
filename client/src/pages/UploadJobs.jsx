import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { CgChevronDoubleLeftR } from 'react-icons/cg';
function UploadJobs() {
    // let error = {
    //     "company": "",
    //     "position": ""
    const navigate = useNavigate()
    const [error, setError] = useState({})
    let initialState = {

        company: "",
        position: '',
        Type: "",
        location: "",
        experience: "",
        qualification: "",
        jobRequirement: "",
        jobDescription: "",
        salary: "",
        vacancy: "",
        deadline: ""

    }
    const [data, setData] = useState(initialState)
    function handleSubmit(e) {
        e.preventDefault()
        setError({})
        axios.post("http://localhost:8080/api/job/create-job", {

            "company": e.target.company.value,
            "position": e.target.position.value,
            "Type": e.target.jobType.value,
            "location": e.target.location.value,
            "experience": e.target.experience.value,
            "qualification": e.target.qualification.value,
            "jobRequirement": e.target.jobRequirement.value,
            "jobDescription": e.target.jobDescription.value,
            "salary": e.target.salary.value,
            "vacancy": e.target.vacancy.value,
            "deadline": e.target.deadline.value
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }

        }).then((res => {
            toast.success("Job is created successfully !!!")
            setData(initialState)
            navigate("/postedjobs")
        })).catch(err => {
            console.log(err.response.data.message)

            console.log(err)
            if (err.response.status === 400) {
                let errors = err.response.data.errors
                let temp = {}
                errors.forEach(validationError => {
                    temp[validationError.params] = validationError.msg
                })

                setError(temp)
                console.log("temp", temp)
                console.log("error", error)
                console.log(error.company)
                toast.error("Bad request .check the data")



            } else {
                toast.error("Something went wrong")
            }


        })
    }
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        setError({ ...error, [e.target.name]: "" })

    }
    return (<>


        <div className="  min-h-full flex-1 flex-col justify-center h-20">
            <div className=" py-8 bg-[rgb(244,245,247)]">
                {/* <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    /> */}
                <h2 className=" text-center text-2xl font-bold leading-6 tracking-tight text-gray-800  " >
                    Create A Job
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
                                    onChange={(e) => {
                                        setData({ ...data, company: e.target.value })

                                    }}
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
                                    onChange={(e) => {
                                        setData({ ...data, position: e.target.value })
                                        setError({ ...error, [e.target.position]: "" })

                                    }}
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
                                    onChange={(e) => {
                                        setData({ ...data, Type: e.target.value })

                                    }}
                                    type="enum"
                                    name="jobType"
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
                                    onChange={(e) => {
                                        setData({ ...data, location: e.target.value })
                                    }}
                                    type="text"
                                    name="location"
                                    value={data.location}
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
                                        onChange={(e) => {
                                            setData({ ...data, salary: e.target.value })
                                        }}
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
                                        onChange={(e) => {
                                            setData({ ...data, vacancy: e.target.value })
                                        }}
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
                                        onChange={(e) => {
                                            setData({ ...data, experience: e.target.value })
                                        }}
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
                                        onChange={(e) => {
                                            setData({ ...data, qualification: e.target.value })
                                        }}
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
                                    onChange={(e) => {
                                        setData({ ...data, deadline: e.target.value })
                                    }}
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
                        <label htmlFor="jobRequirement" className="block  after:content-['*'] after:ml-0.5 after:text-red-500 text-lg font-bold leading-6 text-gray-900">
                            Job Requirements
                        </label>
                        <div className="mt-2">
                            <textarea
                                onChange={(e) => {
                                    setData({ ...data, jobRequirement: e.target.value })
                                }}
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
                        <label htmlFor="jobDescription" className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-lg font-bold leading-6 text-gray-900">
                            Job Description
                        </label>
                        <div className="mt-2">
                            <textarea
                                onChange={(e) => {
                                    setData({ ...data, jobDescription: e.target.value })
                                }}
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
            {/* <Link to="#" className="my-4 flex  justify-end"></Link> */}
            {/* <button type="submit" className="button view  mx-10 my-10 ">Post a Job</button> */}
            <button type="submit" className="button view  container my-4 flex justify-center  " >Post a Job</button>
        </form >

    </>

    )
}

export default UploadJobs