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
            element: <CreateAssignment></CreateAssignment>
        },
        {
            path: '/assignment',  
            element: <Assignments></Assignments>,
        },
        {
            path: '/assignment/update/:id',  
            element: <UpdateAssignment></UpdateAssignment>,
            loader: ({ params }) => fetch(`http://localhost:5000/assignment/update/${params.id}`)
        },
        {
            path: '/assignment/:id',  
            element: <ViewAssignmentDetails></ViewAssignmentDetails>,
            loader: ({ params }) => fetch(`http://localhost:5000/assignment/update/${params.id}`)
        },
      ]
    },
  ]);


  export default router;