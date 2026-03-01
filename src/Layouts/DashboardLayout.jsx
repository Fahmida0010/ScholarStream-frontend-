import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUser, FaCog, FaPlus, FaUsers, FaUserGraduate } from "react-icons/fa";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user, loading: authLoading } = useAuth();
  const { role, isRoleLoading, error } = useRole();

  // যদি ব্যাকএন্ড থেকে Unauthorized বা Forbidden এরর আসে
  if (error?.response?.status === 401 || error?.response?.status === 403) {
    return <Navigate to="/login" replace />;
  }

  // লোডিং হ্যান্ডলিং
  if (authLoading || isRoleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // যদি ইউজার না থাকে
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-8">ScholarStream</h2>
        <ul className="space-y-4">
          <li>
            <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "text-primary font-bold flex items-center gap-2" : "flex items-center gap-2 hover:text-primary transition"}>
              <FaUser /> My Profile
            </NavLink>
          </li>
          
          {role === 'admin' && (
            <>
              <div className="divider divider-info opacity-30">Admin</div>
              <li><NavLink to="/dashboard/manage-users" className="flex items-center gap-2 hover:text-primary"><FaUsers /> Manage Users</NavLink></li>
              <li><NavLink to="/dashboard/add-scholarship" className="flex items-center gap-2 hover:text-primary"><FaPlus /> Add Scholarship</NavLink></li>
            </>
          )}

          {role === 'student' && (
            <>
              <div className="divider divider-info opacity-30">Student</div>
              <li><NavLink to="/dashboard/my-applications" className="flex items-center gap-2 hover:text-primary"><FaUserGraduate /> My Apps</NavLink></li>
            </>
          )}

          <div className="mt-10 pt-10 border-t border-gray-700">
            <li><NavLink to="/dashboard/settings" className="flex items-center gap-2 hover:text-primary"><FaCog /> Settings</NavLink></li>
          </div>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;