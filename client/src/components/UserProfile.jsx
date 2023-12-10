
import React, { useState, useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setReduxUser, logoutReduxUser } from '../redux/slice/userSlice';

const UserProfileMenu = () => {
    const dispatch = useDispatch();
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('reduxUser'));
        if (storedUser) {
            dispatch(setReduxUser(storedUser));
        }
    }, [dispatch]);

    const reduxUser = useSelector((reduxStore) => reduxStore.user.value);
    console.log(reduxUser)
    useEffect(() => {
        if (reduxUser) {
            localStorage.setItem('reduxUser', JSON.stringify(reduxUser));
        }
    }, [reduxUser]);

    return (
        <div className="  profile-menu absolute inline-block">
            <div className="profile-icon md:py-1" onClick={toggleMenu}>
                {reduxUser && <CgProfile size={33} color="#338573" />}
            </div>

            {!reduxUser &&
                toast.success('Log in required', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                })}

            {reduxUser && isMenuOpen && (
                <div className="origin-top-right relative right-0 mt-2 w-48 bg-white border rounded shadow-md">
                    <ul
                        className="py-2"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {reduxUser && (
                            <li>
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    role="menuitem"
                                    onClick={closeMenu}
                                >
                                    Profile
                                </Link>
                            </li>
                        )}

                        {reduxUser?.role === 'applicant' && (
                            <li>
                                <Link
                                    to="/appliedjobs"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    role="menuitem"
                                    onClick={closeMenu}
                                >
                                    Applied Jobs
                                </Link>
                            </li>
                        )}

                        {reduxUser?.role === 'recruiter' && (
                            <>
                                <li>
                                    <Link
                                        to="/uploadjobs"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                        role="menuitem"
                                        onClick={closeMenu}
                                    >
                                        Upload Job
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/postedjobs"
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                        role="menuitem"
                                        onClick={closeMenu}
                                    >
                                        Posted Jobs
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserProfileMenu;
