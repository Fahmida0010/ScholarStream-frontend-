import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../../../components/Shared/Button/Button";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [scholarships, setScholarships] = useState([]);
  const { loading } = useAuth();

  const fetchData = async () => {
    try {
      const res = await axiosSecure(`${import.meta.env.VITE_API_URL}/manage-scholarships`);
      if (Array.isArray(res.data)) {
        setScholarships(res.data);
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
      await axios.delete(`${import.meta.env.VITE_API_URL}/manage-scholarship/${id}`);
      Swal.fire("Deleted!", "Scholarship removed!", "success");
      fetchData();
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-base-content">
      <h1 className="text-2xl font-bold mb-5 text-left">Manage Scholarships</h1>

      {/* Desktop Table - bg-purple-300 বদলে bg-base-100 করা হয়েছে */}
      <div className="hidden lg:block overflow-x-auto rounded-xl shadow-lg border border-base-300">
        <table className="w-full bg-base-100">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="p-3">Image</th>
              <th className="p-3">Scholarship</th>
              <th className="p-3">University</th>
              <th className="p-3">Deadline</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((scholar) => (
              /* hover:bg-base-200 ডার্ক মোডে সুন্দর দেখায় */
              <tr key={scholar._id} className="border-b border-base-300 hover:bg-base-200 transition-colors">
                <td className="p-3">
                  <img src={scholar.image} alt="" className="w-16 rounded border border-base-300" />
                </td>
                <td className="p-3 font-medium">{scholar.scholarshipName}</td>
                <td className="p-3">{scholar.universityName}</td>
                <td className="p-3">{scholar.deadline}</td>
                <td className="p-3 flex gap-2 flex-wrap">
                  <Button
                    onClick={() => (window.location.href = `/dashboard/update-scholarship/${scholar._id}`)}
                    className="bg-sky-500 text-white border-none"
                  >
                    Update
                  </Button>
                  <Button onClick={() => handleDelete(scholar._id)} className="bg-red-500 text-white border-none">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tablet Table */}
      <div className="hidden md:block lg:hidden overflow-x-auto rounded-xl shadow-lg border border-base-300">
        <table className="w-full bg-base-100">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="p-2">Scholarship</th>
              <th className="p-2">University</th>
              <th className="p-2">Deadline</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {scholarships.map((scholar) => (
              <tr key={scholar._id} className="hover:bg-base-200 transition-colors">
                <td className="p-2 flex items-center gap-2">
                  <img src={scholar.image} alt="" className="w-12 rounded border border-base-300" />
                  <span className="font-medium">{scholar.scholarshipName}</span>
                </td>
                <td className="p-2">{scholar.universityName}</td>
                <td className="p-2">{scholar.deadline}</td>
                <td className="p-2 flex flex-wrap gap-2">
                  <Button
                    onClick={() => (window.location.href = `/dashboard/update-scholarship/${scholar._id}`)}
                    className="bg-sky-500 text-white border-none"
                  >
                    Update
                  </Button>
                  <Button onClick={() => handleDelete(scholar._id)} className="bg-red-500 text-white border-none">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards - bg-purple-300 বদলে bg-base-100 */}
      <div className="md:hidden space-y-4">
        {scholarships.map((scholar) => (
          <div key={scholar._id} className="bg-base-100 border border-base-300 rounded-xl shadow p-4 space-y-2">
            <div className="flex items-center gap-3">
              <img src={scholar.image} alt="" className="w-16 h-16 rounded border border-base-300" />
              <h2 className="font-bold text-lg">{scholar.scholarshipName}</h2>
            </div>
            <p className="text-sm opacity-80 font-medium"><b>University:</b> {scholar.universityName}</p>
            <p className="text-sm opacity-80 font-medium"><b>Deadline:</b> {scholar.deadline}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                onClick={() => (window.location.href = `/dashboard/update-scholarship/${scholar._id}`)}
                className="bg-sky-500 text-white w-full border-none"
              >
                Update
              </Button>
              <Button onClick={() => handleDelete(scholar._id)} className="bg-red-500 text-white w-full border-none">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageScholarships;