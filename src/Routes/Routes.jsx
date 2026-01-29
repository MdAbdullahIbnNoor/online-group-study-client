import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Authentication/LoginPage";
import SignUp from "../pages/Authentication/SignUp";
import CreateAssignment from "../pages/CreateAssignment/CreateAssignment";
import Assignments from "../pages/Assignments/Assignments";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import UpdateAssignment from "../pages/UpdateAssignment/UpdateAssignment";
import ViewAssignmentDetails from "../pages/ViewAssignmentDetails/ViewAssignmentDetails";
import SubmittedAssignments from "../pages/SubmittedAssignment/SubmittedAssignment";
import MyAssignmentPage from "../pages/MyAssignmentPage/MyAssignmentPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import ResourceLibrary from "../pages/ResourceLibrary/ResourceLibrary";
import PrivateRoute from "./PrivateRoute";


import { API_URL } from '../api/config';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <LoginPage></LoginPage>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/createassignment',
                element: <PrivateRoute><CreateAssignment></CreateAssignment></PrivateRoute>
            },
            {
                path: '/assignment',
                element: <Assignments></Assignments>,
                loader: () => fetch(`${API_URL}/assignment`)
            },
            {
                path: '/assignment/update/:id',
                element: <PrivateRoute><UpdateAssignment></UpdateAssignment></PrivateRoute>,
                loader: ({ params }) => fetch(`${API_URL}/assignment/update/${params.id}`, {
                    credentials: 'include', // Add this line to include credentials
                })
            },
            {
                path: '/assignment/:id',
                element: <PrivateRoute><ViewAssignmentDetails></ViewAssignmentDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`${API_URL}/assignment/${params.id}`, {
                    credentials: 'include', // Add this line to include credentials
                })
            },
            {
                path: '/myAssignment',
                element: <PrivateRoute><MyAssignmentPage></MyAssignmentPage></PrivateRoute>
            },
            {
                path: '/submittedAssignment',
                element: <PrivateRoute><SubmittedAssignments></SubmittedAssignments></PrivateRoute>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: '/resources',
                element: <ResourceLibrary></ResourceLibrary>
            },
        ]
    },
]);


export default router;