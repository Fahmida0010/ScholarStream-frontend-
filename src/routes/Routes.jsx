import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import TopScholarships from "../pages/Home/TopScholarships/TopScholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import AllScholarships from "../pages/AllScholarships/AllScholarships";

 export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children:[
      {
         index: true,
       Component: Home
      },
      {
  path: "/all-scholarships",
  element: <AllScholarships />,
},
      {
  path: "/top-scholarships",
  element: <TopScholarships />,
},
{
  path: "/scholarship/:id",
  element: <ScholarshipDetails/>,
},
     {
        path:'/',
        Component: AuthLayout,
        children:[
       {
         path: 'login',
         Component: Login
       },
     {
        path : 'register',
        Component: Register
     },
     ]
    }
    ]
  },
]);
