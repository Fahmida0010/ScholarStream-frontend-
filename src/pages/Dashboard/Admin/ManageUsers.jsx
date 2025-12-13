import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../../../components/Shared/Button/Button";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    await axios.patch(`http://localhost:3000/users/role/${id}`, { role: newRole });
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
      await axios.delete(`http://localhost:3000/users/${id}`);
      Swal.fire("Deleted!", "User removed.", "success");
      fetchUsers();
    }
  };

  const filtered = filterRole === "all"
    ? users
    : users.filter((u) => u.role === filterRole);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <select
        className="p-2 border rounded mb-4"
        onChange={(e) => setFilterRole(e.target.value)}
      >
        <option value="all">All</option>
        <option value="student">Student</option>
        <option value="moderator">Moderator</option>
        <option value="admin">Admin</option>
      </select>

      <table className="w-full bg-green-100 shadow rounded-xl text-left">
        <thead>
          <tr className="bg-gray-300">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Promote</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((u) => (
            <tr key={u._id} className="border-b">
              <td className="p-3">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>

              <td>
                <select
                  className="p-2 border rounded bg-green-400"
                  onChange={(e) => handleRoleChange(u._id, e.target.value)}
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
                  className="btn bg-red-500 text-white"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
