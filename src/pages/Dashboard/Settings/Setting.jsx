import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getAuth,
  signOut,
  deleteUser,
  sendEmailVerification,
} from "firebase/auth";
import {
  FaUserEdit,
  FaKey,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaTrash,
  FaEnvelope,
} from "react-icons/fa";

const Setting = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute('data-theme', savedTheme);
    setDarkMode(savedTheme === "dark");
  }, []);

  const handleThemeToggle = () => {
    const newTheme = darkMode ? "light" : "dark";
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem("theme", newTheme);
    setDarkMode(!darkMode);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Yes, Logout",
    });

    if (result.isConfirmed) {
      await signOut(auth);
      Swal.fire("Logged Out!", "", "success");
      navigate("/");
    }
  };

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "Delete Account?",
      text: "This action cannot be undone!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(user);
        Swal.fire("Account Deleted!", "", "success");
        navigate("/");
      } catch (error) {
        Swal.fire("Error", "Please re-login before deleting account.", "error");
      }
    }
  };

  const handleVerifyEmail = async () => {
    await sendEmailVerification(user);
    Swal.fire("Verification Sent", "Check your email inbox.", "success");
  };

  return (
    // bg-base-100 এবং text-base-content ব্যবহার করায় এটি অটো থিম অনুযায়ী কালার নিবে
    <div className="max-w-3xl mx-auto bg-base-100 text-base-content shadow-2xl rounded-2xl p-8 transition-colors duration-300 border border-base-200">
      
      <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Account Settings
      </h2>

      {/* User Info Section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 pb-6 border-b border-base-200">
        <div className="avatar">
          <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL || "https://via.placeholder.com/150"} alt="user" />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-bold">{user?.displayName || "User Name"}</h3>
          <p className="opacity-70 text-lg">{user?.email}</p>
          <div className={`badge mt-2 p-3 font-medium ${user?.emailVerified ? "badge-success" : "badge-error"}`}>
            {user?.emailVerified ? "Email Verified" : "Email Not Verified"}
          </div>
        </div>
      </div>

      {/* Settings Options Grid */}
      <div className="grid grid-cols-1 gap-4">

        {/* Update Profile */}
        <button
          onClick={() => navigate("/dashboard/update-profile")}
          className="flex items-center gap-4 p-5 bg-base-200 hover:bg-base-300 rounded-xl transition-all duration-200 active:scale-[0.98]"
        >
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><FaUserEdit size={20} /></div>
          <span className="font-semibold">Update Profile</span>
        </button>

        {/* Change Password */}
        <button
          onClick={() => navigate("/dashboard/update-password")}
          className="flex items-center gap-4 p-5 bg-base-200 hover:bg-base-300 rounded-xl transition-all duration-200 active:scale-[0.98]"
        >
          <div className="p-3 bg-green-100 text-green-600 rounded-lg"><FaKey size={20} /></div>
          <span className="font-semibold">Change Password</span>
        </button>

        {/* Email Verification */}
        {!user?.emailVerified && (
          <button
            onClick={handleVerifyEmail}
            className="flex items-center gap-4 p-5 bg-warning/10 hover:bg-warning/20 border border-warning/20 rounded-xl transition-all duration-200"
          >
            <div className="p-3 bg-warning text-warning-content rounded-lg"><FaEnvelope size={20} /></div>
            <span className="font-semibold text-warning-content">Verify Email Address</span>
          </button>
        )}

        {/* Dark Mode Toggle */}
        <button
          onClick={handleThemeToggle}
          className="flex items-center justify-between p-5 bg-base-200 hover:bg-base-300 rounded-xl transition-all duration-200"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${darkMode ? "bg-yellow-400 text-black" : "bg-slate-700 text-white"}`}>
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </div>
            <span className="font-semibold">Appearance</span>
          </div>
          <span className="badge badge-outline">{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>

        <div className="divider my-4">Danger Zone</div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 p-5 bg-error/10 hover:bg-error/20 border border-error/20 rounded-xl transition-all duration-200 text-error font-semibold"
        >
          <div className="p-3 bg-error text-error-content rounded-lg"><FaSignOutAlt size={20} /></div>
          <span>Sign Out</span>
        </button>

        {/* Delete Account */}
        <button
          onClick={handleDeleteAccount}
          className="flex items-center gap-4 p-5 bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-200 text-white font-semibold shadow-lg shadow-red-200 dark:shadow-none"
        >
          <div className="p-3 bg-white/20 rounded-lg"><FaTrash size={20} /></div>
          <span>Delete My Account</span>
        </button>

      </div>
    </div>
  );
};

export default Setting;