import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const UpdatePassword = () => {
  const { user } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      return Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 6 characters long",
      });
    }

    try {
      setLoading(true);

      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      Swal.fire({
        icon: "success",
        title: "Password Updated!",
        text: "Your password has been changed successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Update Password
        </h2>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;