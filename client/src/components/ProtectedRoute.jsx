import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
export default function ProtectedRoute(role) {

    let user = useSelector((reduxStore) => reduxStore.user.value)
    if (user) {
        return <Outlet />
    }
    return <Navigate to="/login" />
}
