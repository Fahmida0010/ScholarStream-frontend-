import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/scholarships");
    setScholarships(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete?",
      text: "Are you sure you want to delete this scholarship?",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      await axios.delete(`http://localhost:3000/scholarships/${id}`);
      Swal.fire("Deleted!", "Scholarship removed!", "success");
      fetchData();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Manage Scholarships</h1>

      <table className="w-full bg-white shadow rounded-xl">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Image</th>
            <th>Scholarship</th>
            <th>University</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {scholarships.map((scholar) => (
            <tr key={scholar._id} className="border-b">
              <td className="p-3">
                <img src={scholar.image} alt="" className="w-16 rounded" />
              </td>
              <td>{scholar.scholarshipName}</td>
              <td>{scholar.universityName}</td>
              <td>{scholar.deadline}</td>

              <td className="flex gap-2">
                <button
                  onClick={() => window.location.href = `/dashboard/update-scholarship/${scholar._id}`}
                  className="btn bg-yellow-500 text-white"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(scholar._id)}
                  className="btn bg-red-600 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageScholarships;
