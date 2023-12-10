
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setReduxJob } from '../redux/slice/jobSlice'
export default function AppliedJob(job) {
    const dispatch = useDispatch();
    //const jobItems = useSelector((reduxStore) => { return reduxStore.job.jobItems })
    useEffect(() => {
        const storedJob = JSON.parse(localStorage.getItem('jobItems.job'));
        if (storedJob) {
            dispatch(setReduxJob(storedJob));
        }
    }, [dispatch]);

    const jobItems = useSelector((reduxStore) => reduxStore.job.jobItems);
    console.log(jobItems)
    useEffect(() => {
        if (jobItems) {
            localStorage.setItem('jobItems', JSON.stringify(jobItems));
        }
    }, [jobItems]);
    console.log(jobItems)
    if (jobItems.length === 0) {
        return (<>    <nav className="h-[85vh]"> <div className=" title container my-5 border-4 rounded-lg  shadow-md text-center"> No Job Applied  Yet</div>;</nav>  </>)
    } else {
        return (
            <>

                <div className=" py-8 bg-[#F4F5F7]">

                    <h2 className="text-center text-2xl font-bold leading-6 tracking-tight text-green-800  " >
                        Applied Jobs
                    </h2>
                </div>
                <div className="my-5 ">

                    <div className=" container ">
                        <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">


                            <thead className=" mx-2 text-xl text-gray-700 Camelcase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="">
                                    <th scope="col" className="title1">
                                        Company
                                    </th>
                                    <th scope="col" className="title1">
                                        Position
                                    </th>
                                    <th scope="col" className=" title1">
                                        Job Type
                                    </th>
                                    <th scope="col" className=" title1">
                                        Location
                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                {jobItems.map(item => {
                                    return <tr key={item._id} className="  bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th className="   py-4 details1   ">
                                            {item.job.company}
                                        </th>
                                        <td className="details1">

                                            {item.job.position}
                                        </td>
                                        <td className="details1">
                                            {item.job.Type}
                                        </td>
                                        <td className=" details1">
                                            {item.job.Location}
                                        </td>
                                    </tr>
                                })}


                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}