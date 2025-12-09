import { NavLink, Outlet } from "react-router";
import { FaUser, FaPlus, FaUsers, FaChartPie, FaSchool } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth(); 

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl p-5">
        <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>

        {/* COMMON LINKS (ALL ROLES) */}
        <ul className="space-y-3">
          <li>
            <NavLink
              to="/dashboard"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
            >
              <FaUser /> My Profile
            </NavLink>
          </li>
        </ul>

        {/* ADMIN ONLY LINKS */}
        {/* {user?.role === "admin" && ( */}
          <>
            <h2 className="mt-6 mb-2 text-gray-500 text-sm">ADMIN PANEL</h2>
            <ul className="space-y-3">

              <li>
           <NavLink
                  to="/dashboard/add-scholarship"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
                >
                  <FaPlus /> Add Scholarship
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manage-scholarships"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
                >
                  <FaSchool /> Manage Scholarships
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manage-users"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
                >
                  <FaUsers /> Manage Users
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/analytics"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
                >
                  <FaChartPie /> Analytics
                </NavLink>
              </li>
            </ul>
          </>
        {/* )} */}

        {/* MODERATOR ONLY LINKS */}
        {/* {user?.role === "moderator" && ( */}
          <>
            <h2 className="mt-6 mb-2 text-gray-500 text-sm">MODERATOR PANEL</h2>

            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/dashboard/manage-applications"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
                >
                  <FaSchool /> Manage Applications
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/all-reviews"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
                >
                  <FaUsers /> All Reviews 
                </NavLink>
              </li>
            </ul>
          </>
        {/* )} */}

        {/* STUDENT ONLY LINKS */}
        {/* {user?.role === "student" && ( */}
          <>
            <h2 className="mt-6 mb-2 text-gray-500 text-sm">STUDENT PANEL</h2>

            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/dashboard/my-applications"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
                >
                  🎓 My Application
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/my-reviews"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
                >
                  ⭐ My Reviews
                </NavLink>
              </li>
            </ul>
          </>
        {/* )} */}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
