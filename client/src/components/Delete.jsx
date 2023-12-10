import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
const DeleteConfirmation = ({ onDelete }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate()
    const handleDelete = () => {
        onDelete();
        setShowConfirmation(false);
    };

    const handleCancel = () => {
        // setShowConfirmation(false);

        navigate("/postedjobs")

    };

    const showDeleteConfirmation = () => {
        setShowConfirmation(true);

    };

    return (
        <>
            <div className="my-8">
                < div >


                    <div className=" container ">
                        <p className="my-8">Are you sure you want to delete the job?</p>
                        <button onClick={handleDelete} className="button hover:bg-red-600 mx-2">Yes</button>
                        <button onClick={handleCancel} className=" button hover:bg-blue-400 mx-2 ">No</button>
                    </div>

                </div >
            </div >
        </>
    );
};

export default DeleteConfirmation;
