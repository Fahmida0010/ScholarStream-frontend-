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

  return (
    /* bg-gray-100 এর জায়গায় bg-base-200 এবং টেক্সট কালার ফিক্স করা হয়েছে */
    <div className="flex bg-base-200 min-h-screen text-base-content transition-colors duration-300">
      {/* Sidebar - bg-gray-300 এর জায়গায় bg-base-300 করা হয়েছে */}
      <div className="w-64 bg-base-300 shadow-xl p-7">
        <h1 className="text-2xl font-bold mb-6 text-left">Dashboard</h1>

        {/* COMMON LINKS */}
        <ul className="space-y-3">
          <li>
            <NavLink
              to="/dashboard"
              /* hover:bg-gray-200 এর জায়গায় hover:bg-base-100 */
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-100 transition-colors"
            >
              <FaUser /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/settings"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-100 transition-colors"
            >
              <FaCog /> Settings
            </NavLink>
          </li>
        </ul>

        {/* ADMIN ONLY */}
        {role === "admin" && (
          <>
            {/* text-gray-500 এর জায়গায় text-base-content/50 (opacity) ব্যবহার করা হয়েছে */}
            <h2 className="mt-6 mb-2 text-base-content/50 text-sm">ADMIN PANEL</h2>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/dashboard/add-scholarship"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-100"
                >
                  <FaPlus /> Add Scholarship
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manage-scholarships"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-100"
                >
                  <FaSchool /> Manage Scholarships
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manage-users"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-100"
                >
                  <FaUsers /> Manage Users
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/analytics"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-100"
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
            <h2 className="mt-6 mb-2 text-base-content/50 text-sm">MODERATOR PANEL</h2>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/dashboard/manage-applications"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-100"
                >
                  <FaSchool /> Manage Applications
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/all-reviews"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-100"
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
            <h2 className="mt-6 mb-2 text-base-content/50 text-sm">STUDENT PANEL</h2>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/dashboard/my-applications"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-100"
                >
                  <FaUserGraduate /> My Application
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/my-reviews"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-100"
                >
                  <VscFeedback /> My Reviews
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-10 bg-base-100 transition-colors duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;