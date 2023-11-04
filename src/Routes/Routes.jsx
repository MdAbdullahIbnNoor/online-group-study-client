import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Authentication/LoginPage";
import SignUp from "../pages/Authentication/SignUp";
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
        }
      ]
    },
  ]);


  export default router;