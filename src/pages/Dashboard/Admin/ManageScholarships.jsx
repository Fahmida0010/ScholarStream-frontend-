import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../../../components/Shared/Button/Button";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/scholarships");

      console.log("Response from API:", res.data);

      if (Array.isArray(res.data.scholarships)) {
        setScholarships(res.data.scholarships);
      } else {
        setScholarships([]);
      }
    } catch (error) {
      console.log("API Error:", error);
      setScholarships([]);
    }
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
      await axios.delete(`http://localhost:3000/manage-scholarship/${id}`);
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
          {Array.isArray(scholarships) &&
            scholarships.map((scholar) => (
              <tr key={scholar._id} className="border-b">
                <td className="p-3">
                  <img src={scholar.universityImage} alt=""
                    className="w-16 rounded" />
                </td>
                <td>{scholar.scholarshipName}</td>
                <td>{scholar.universityName}</td>
                <td>{scholar.applicationDeadline}</td>

                <td className="flex gap-2">
                  <Button
                    onClick={() =>
                      (window.location.href = `/dashboard/update-scholarship/${scholar._id}`)
                    }
                    className="bg-sky-400"
                  >
                    Update
                  </Button>

                  <Button
                    onClick={() => handleDelete(scholar._id)}
                    className="bg-red-500"
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

export default ManageScholarships;
