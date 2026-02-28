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

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // Toggle Theme
  const handleThemeToggle = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  // Logout
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
    });

    if (result.isConfirmed) {
      await signOut(auth);
      Swal.fire("Logged Out!", "", "success");
      navigate("/");
    }
  };

  // Delete Account
  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "Delete Account?",
      text: "This action cannot be undone!",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(user);
        Swal.fire("Account Deleted!", "", "success");
        navigate("/");
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  // Email Verification
  const handleVerifyEmail = async () => {
    await sendEmailVerification(user);
    Swal.fire(
      "Verification Sent",
      "Check your email inbox.",
      "success"
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 dark:text-white shadow-xl rounded-2xl p-8 transition duration-300">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Account Settings
      </h2>

      {/* User Info */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={user?.photoURL}
          alt="user"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h3 className="text-xl font-semibold">
            {user?.displayName}
          </h3>
          <p className="text-gray-500 dark:text-gray-300">
            {user?.email}
          </p>
          <p
            className={`text-sm mt-1 ${
              user?.emailVerified
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {user?.emailVerified
              ? "Email Verified"
              : "Email Not Verified"}
          </p>
        </div>
      </div>

      {/* Settings Options */}
      <div className="space-y-4">

        {/* Update Profile */}
        <button
          onClick={() => navigate("/dashboard/update-profile")}
          className="w-full flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <FaUserEdit className="text-blue-500" />
          <span>Update Profile</span>
        </button>

        {/* Change Password */}
        <button
          onClick={() => navigate("/dashboard/update-password")}
          className="w-full flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <FaKey className="text-green-500" />
          <span>Change Password</span>
        </button>

        {/* Email Verification */}
        {!user?.emailVerified && (
          <button
            onClick={handleVerifyEmail}
            className="w-full flex items-center gap-3 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-xl hover:bg-yellow-200 transition"
          >
            <FaEnvelope className="text-yellow-600" />
            <span>Verify Email</span>
          </button>
        )}

        {/* Dark Mode Toggle */}
        <button
          onClick={handleThemeToggle}
          className="w-full flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-700" />
          )}
          <span>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-4 bg-red-100 dark:bg-red-900 rounded-xl hover:bg-red-200 transition"
        >
          <FaSignOutAlt className="text-red-500" />
          <span className="text-red-600 dark:text-red-400">
            Logout
          </span>
        </button>

        {/* Delete Account */}
        <button
          onClick={handleDeleteAccount}
          className="w-full flex items-center gap-3 p-4 bg-red-200 dark:bg-red-800 rounded-xl hover:bg-red-300 transition"
        >
          <FaTrash className="text-red-700" />
          <span className="text-red-700 dark:text-red-300">
            Delete Account
          </span>
        </button>

      </div>
    </div>
  );
};

export default Setting;