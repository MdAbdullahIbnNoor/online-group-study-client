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
import PrivateRoute from "./PrivateRoute";
// import BookService from "../pages/BookService/BookService";
// import Bookings from "../pages/Bookings/Bookings";
// import PrivateRoute from "./PrivateRoute";


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
                loader: () => fetch('https://online-group-study-server-nu.vercel.app/assignment')
            },
            {
                path: '/assignment/update/:id',
                element: <PrivateRoute><UpdateAssignment></UpdateAssignment></PrivateRoute>,
                loader: ({ params }) => fetch(`https://online-group-study-server-nu.vercel.app/assignment/update/${params.id}`, {
                    credentials: 'include', // Add this line to include credentials
                })
            },
            {
                path: '/assignment/:id',
                element: <PrivateRoute><ViewAssignmentDetails></ViewAssignmentDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://online-group-study-server-nu.vercel.app/assignment/update/${params.id}`, {
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
        ]
    },
]);


export default router;