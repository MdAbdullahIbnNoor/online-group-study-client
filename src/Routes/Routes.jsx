import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Authentication/LoginPage";
import SignUp from "../pages/Authentication/SignUp";
import CreateAssignment from "../pages/CreateAssignment/CreateAssignment";
import Assignments from "../pages/Assignments/Assignments";
// import BookService from "../pages/BookService/BookService";
// import Bookings from "../pages/Bookings/Bookings";
// import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
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
            element: <Assignments></Assignments>
        },
      ]
    },
  ]);


  export default router;