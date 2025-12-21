import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../../../components/Shared/Button/Button";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
        Manage Users
      </h1>

      {/* Filter */}
      <div className="mb-4 flex justify-center md:justify-start">
        <select
          className="p-2 border rounded w-full max-w-xs"
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All</option>
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
            className="bg-green-100 p-4 rounded-xl shadow"
          >
            <p className="font-semibold">Name: {u.displayName}</p>
            <p className="text-sm break-all">Email: {u.email}</p>
            <p className="mt-1">
              Role: <span className="font-medium">{u.role}</span>
            </p>

            <div className="mt-3 space-y-2">
              <select
                className="p-2 border rounded w-full bg-green-400"
                onChange={(e) =>
                  handleRoleChange(u._id, e.target.value)
                }
              >
                <option>Select Role</option>
                <option value="student">Student</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>

              <Button
                onClick={() => handleDeleteUser(u._id)}
                className="w-full bg-red-500 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP TABLE VIEW ================= */}
      <div className="hidden md:block overflow-x-auto p-6">
        <table className="w-full bg-green-100 shadow rounded-xl text-left">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Promote</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((u) => (
              <tr key={u._id} className="border-b">
                <td className="p-3">{u.displayName}</td>
                <td className="break-all">{u.email}</td>
                <td>{u.role}</td>

                <td>
                  <select
                    className="p-2 border rounded bg-green-400"
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

                <td>
                  <Button
                    onClick={() => handleDeleteUser(u._id)}
                    className="bg-red-500 text-white m-3"
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
