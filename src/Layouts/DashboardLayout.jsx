import { NavLink, Outlet } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import {
  FaUser,
  FaPlus,
  FaUsers,
  FaChartPie,
  FaSchool,
  FaUserGraduate,
} from "react-icons/fa";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import { VscFeedback } from "react-icons/vsc";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role, isRoleLoading } = useRole();

  // Skeleton Loading UI (when role is being fetched)
  if (isRoleLoading) {
    return (
      <div className="flex bg-gray-100 min-h-screen">
        {/* Sidebar Skeleton */}
        <div className="w-64 bg-gray-300 shadow-xl p-7">
          {/* Dashboard Title Skeleton */}
          <div className="skeleton h-8 w-48 rounded mb-8"></div>

          {/* Common Links Skeleton */}
          <div className="space-y-4 mb-10">
            <div className="skeleton h-10 w-full rounded"></div>
          </div>

          {/* Panel Skeleton (covers Admin/Moderator/Student) */}
          <div className="mt-6">
            <div className="skeleton h-5 w-40 rounded mb-4"></div>
            <div className="space-y-4">
              <div className="skeleton h-10 w-full rounded"></div>
              <div className="skeleton h-10 w-full rounded"></div>
              <div className="skeleton h-10 w-full rounded"></div>
              <div className="skeleton h-10 w-full rounded"></div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 p-10">
          {/* Page Title / Welcome Area Skeleton */}
          <div className="skeleton h-12 w-80 rounded mb-10"></div>

          {/* Content Placeholder Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="skeleton h-64 w-full rounded-2xl shadow-md"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-300 shadow-xl p-7">
        <h1 className="text-2xl font-bold mb-6 text-left">Dashboard</h1>

        {/* COMMON LINKS */}
        <ul className="space-y-3">
          <li>
            <NavLink
              to="/dashboard"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
            >
              <FaUser /> My Profile
            </NavLink>
          </li>
          <li>
  <NavLink
    to="/dashboard/settings"
    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
  >
    <FaCog /> Settings
  </NavLink>
</li>
        </ul>

        {/* ADMIN ONLY */}
        {role === "admin" && (
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
        )}

        {/* MODERATOR ONLY */}
        {role === "moderator" && (
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
        )}

        {/* STUDENT ONLY */}
        {role === "student" && (
          <>
            <h2 className="mt-6 mb-2 text-gray-500 text-sm">STUDENT PANEL</h2>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/dashboard/my-applications"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
                >
                  <FaUserGraduate /> My Application
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/my-reviews"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
                >
                  <VscFeedback /> My Reviews
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;