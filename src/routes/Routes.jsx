import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import AllScholarships from "../pages/AllScholarships/AllScholarships";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../components/Shared/ErrorPage/ErrorPage";
import TopScholarships from "../pages/Home/TopScholarships/TopScholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import Checkout from "../pages/Payment/Checkout";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentFailed from "../pages/Payment/PaymentFailed";
import AuthLayout from "../Layouts/AuthLayout";
import PrivateRoute from "./PrivateRoutes";
import DashboardLayout from "../Layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Profile/Profile";
import AdminRoute from "./AdminRoute";
import AddScholarship from "../pages/Dashboard/Admin/AddScholarship";
import ManageScholarships from "../pages/Dashboard/Admin/ManageScholarships";
import UpdateScholarship from "../pages/Dashboard/Admin/UpdateScholarship";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Analytics from "../pages/Dashboard/Admin/Analytics";
import ModeratorRoute from "./ModeratorRoute";
import ManageApplications from "../pages/Dashboard/Moderator/ManageApplications";
import AllReviews from "../pages/Dashboard/Moderator/AllReviews";
import MyApplications from "../pages/Dashboard/Student/MyApplications";
import AddReview from "../pages/Dashboard/Modal/AddReview";
import MyReviews from "../pages/Dashboard/Student/MyReviews";
import UpdateReviews from "../pages/Dashboard/Modal/UpdateReviews";
import ApplicationDetails from "../pages/Dashboard/Modal/ApplicationDetails";
import Feedback from "../pages/Dashboard/Modal/Feedback";
import EditApplication from "../pages/Dashboard/Modal/EditApplication";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import ManageDetails from "../pages/Dashboard/Modal/ManageDetails";
import UpdateProfile from "../pages/Dashboard/UpdateProfile";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "/all-scholarships", element: <AllScholarships /> },
      { path: "*", element: <ErrorPage /> },
      { path: "/top-scholarships", element: <TopScholarships /> },
      { path: "/scholarships/:id", element: <ScholarshipDetails /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/checkout/:id", element: <Checkout /> },
      { path: "/payment-success", element: <PaymentSuccess/> },
      { path: "/payment-failed", element: <PaymentFailed/> },

      {
        path: "/",
        Component: AuthLayout,
        children: [
          { path: "login", Component: Login },
          { path: "register", Component: Register },
        ],
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard", element: <Profile/> },

      // ADMIN ROUTES
      {
        path: "add-scholarship",
        element: (
          <AdminRoute>
            <AddScholarship />
          </AdminRoute>
        ),
      },
      {
        path: "manage-scholarships",
        element: (
          <AdminRoute>
            <ManageScholarships />
          </AdminRoute>
        ),
      },
      {
        path: "update-scholarship/:id",
        element: (
          <AdminRoute>
            <UpdateScholarship />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        ),
      },

      // MODERATOR ROUTES
      {
        path: "manage-applications",
        element: (
          <ModeratorRoute>
            <ManageApplications />
          </ModeratorRoute>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <ModeratorRoute>
            <AllReviews/>
          </ModeratorRoute>
        ),
      },
         {
        path: "manage-details/:id",
        element: (
          <ModeratorRoute>
            <ManageDetails/>
          </ModeratorRoute>
        ),
      },
     {
        path: "feedback/:id",
        element: (
          <ModeratorRoute>
            <Feedback/>
          </ModeratorRoute>
        ),
      },

      // STUDENT ROUTES
      { path: "my-applications", element: <MyApplications /> },
      { path: "add-review/:id", element: <AddReview /> },
      { path: "my-reviews", element: <MyReviews /> },
      { path: "update-reviews/:id", element: <UpdateReviews/> },
       { path: "application-details/:id", element: <ApplicationDetails /> },
      { path: "edit-application/:id", element: <EditApplication/> },
      {path: "update-profile", element: <UpdateProfile />,}
    ],
  },
]);
