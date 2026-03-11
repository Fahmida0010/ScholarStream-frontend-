import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../../../components/Shared/Button/Button";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");

  const fetchUsers = async () => {
    const res = await axiosSecure(`${import.meta.env.VITE_API_URL}/users`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/role/${id}`,
      { role: newRole }
    );
    Swal.fire("Success!", `User promoted to ${newRole}`, "success");
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete User?",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`);
      Swal.fire("Deleted!", "User removed.", "success");
      fetchUsers();
    }
  };

  const filtered =
    filterRole === "all"
      ? users
      : users.filter((u) => u.role === filterRole);

  return (
    <div className="p-4 text-base-content">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
        Manage Users
      </h1>

      {/* Filter */}
      <div className="mb-4 flex justify-center md:justify-start">
        <select
          className="p-2 border border-base-300 rounded w-full max-w-xs bg-base-100 text-base-content focus:outline-none"
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="student">Student</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="grid gap-4 md:hidden">
        {filtered.map((u) => (
          <div
            key={u._id}
            /* bg-green-100 বদলে bg-base-100 ও বর্ডার যোগ করা হয়েছে */
            className="bg-base-100 border border-base-300 p-4 rounded-xl shadow transition-colors duration-300"
          >
            <p className="font-semibold text-indigo-400">Name: {u.displayName}</p>
            <p className="text-sm break-all opacity-80">Email: {u.email}</p>
            <p className="mt-1">
              Role: <span className="font-medium px-2 py-0.5 rounded bg-base-200">{u.role}</span>
            </p>

            <div className="mt-3 space-y-2">
              <select
                className="p-2 border border-base-300 rounded w-full bg-base-200 text-base-content"
                onChange={(e) =>
                  handleRoleChange(u._id, e.target.value)
                }
              >
                <option>Change Role</option>
                <option value="student">Student</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>

              <Button
                onClick={() => handleDeleteUser(u._id)}
                className="w-full bg-red-500 text-white border-none"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP TABLE VIEW ================= */}
      <div className="hidden md:block overflow-x-auto p-2">
        <table className="w-full bg-base-100 border border-base-300 shadow rounded-xl text-left overflow-hidden transition-colors duration-300">
          <thead>
            {/* bg-gray-300 বদলে ডার্ক মোড ফ্রেন্ডলি কালার */}
            <tr className="bg-base-200 text-base-content border-b border-base-300">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Promote</th>
              <th className="p-4">Delete</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-base-300">
            {filtered.map((u) => (
              <tr key={u._id} className="hover:bg-base-200 transition-colors">
                <td className="p-4 font-medium">{u.displayName}</td>
                <td className="p-4 break-all opacity-80">{u.email}</td>
                <td className="p-4">
                    <span className="capitalize">{u.role}</span>
                </td>

                <td className="p-4">
                  <select
                    className="p-2 border border-base-300 rounded bg-base-100 text-base-content cursor-pointer focus:ring-1 focus:ring-indigo-500"
                    onChange={(e) =>
                      handleRoleChange(u._id, e.target.value)
                    }
                  >
                    <option>Select</option>
                    <option value="student">Student</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td className="p-4">
                  <Button
                    onClick={() => handleDeleteUser(u._id)}
                    className="bg-red-500 text-white hover:bg-red-600 transition-colors border-none"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;