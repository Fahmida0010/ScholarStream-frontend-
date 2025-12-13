import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import TopScholarships from "../pages/Home/TopScholarships/TopScholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import AllScholarships from "../pages/AllScholarships/AllScholarships";
import AddScholarship from "../pages/Dashboard/Admin/AddScholarship";
import ManageScholarships from "../pages/Dashboard/Admin/ManageScholarships";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Analytics from "../pages/Dashboard/Admin/Analytics";
import DashboardLayout from "../Layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Profile/Profile";
import UpdateScholarship from "../pages/Dashboard/Admin/UpdateScholarship";
import ManageApplications from "../pages/Dashboard/Moderator/ManageApplications";
import AllReviews from "../pages/Dashboard/Moderator/AllReviews";
import MyApplications from "../pages/Dashboard/Student/MyApplications";
import Checkout from "../pages/Payment/Checkout";
import PaymentFailed from "../pages/Payment/PaymentFailed";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import MyReviews from "../pages/Dashboard/Student/MyReviews";
import ApplicationDetails from "../pages/Dashboard/Modal/ApplicationDetails";
import EditApplication from "../pages/Dashboard/Modal/EditApplication";
import AddReview from "../pages/Dashboard/Modal/AddReview";
import Feedback from "../pages/Dashboard/Modal/Feedback";
import ErrorPage from "../components/Shared/ErrorPage/ErrorPage";
import UpdateReviews from "../pages/Dashboard/Modal/UpdateReviews";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/all-scholarships",
        element: <AllScholarships />,
      },
      {
        path: '*',
        element: <ErrorPage />
      },
      {
        path: "/top-scholarships",
        element: <TopScholarships />,
      },
      {
        path: "/scholarships/:id",
        element: <ScholarshipDetails />,
      },
       { path: "/checkout", element: <Checkout /> },
      {
        path: "/checkout/:id",
        element: <Checkout />,
      },
      { path: "/payment-success", element: <PaymentSuccess /> },
      { path: "/payment-failed", element: <PaymentFailed /> },
      {
        path: '/',
        Component: AuthLayout,
        children: [
          {
            path: 'login',
            Component: Login
          },
          {
            path: 'register',
            Component: Register
          },
        ]
      }
    ]
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard", element: <Profile /> },

      // ADMIN
      { path: "add-scholarship", element: <AddScholarship /> },
      { path: "manage-scholarships", element: <ManageScholarships /> },
      { path: "update-scholarship/:id", element: <UpdateScholarship /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "analytics", element: <Analytics /> },


      // MODERATOR 
      { path: "manage-applications", element: <ManageApplications /> },
      { path: "all-reviews", element: <AllReviews /> },

      // STUDENT 
      {
        path: "my-applications",
        element: <MyApplications />
      },
      {
        path: "add-review/:id",
        element: <AddReview />
      },
      {
        path: "my-reviews",
        element: <MyReviews />
      },
       {
        path: "update-reviews",
        element: <UpdateReviews />
      },
      {
        path: "application-details/:id",
        element: <ApplicationDetails />,
      },
      {
        path: "feedback/:id",
        element: <Feedback />,
      },
      {
        path: "edit-application/:id",
        element: <EditApplication />,
      }
    ],
  }
]);
