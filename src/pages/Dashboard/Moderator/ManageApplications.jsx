import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Button from "../../../components/Shared/Button/Button";

const API = "http://localhost:3000";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/applications`)
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id, newStatus) => {
    const res = await axios.patch(`${API}/manage-application/${id}`, {
      status: newStatus,
    });

    if (res.data.modifiedCount > 0) {
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        )
      );
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Applications</h2>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr className="text-left text-sm">
              <th className="p-2">Name</th>
              <th className="p-2">Applicant Email</th>
              <th className="p-2">University</th>
              <th className="p-2">Status</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-t text-sm">
                <td className="p-2">{app.userName}</td>

                <td className="p-2">{app.userEmail}</td>

                <td className="p-2">{app.universityName}</td>

                <td className="p-2 capitalize">{app.status}</td>

                {/* ⭐ PAYMENT STATUS (ONLY DISPLAY) */}
                <td className="p-2">
                  {app.paymentStatus === "paid" ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Unpaid</span>
                  )}
                </td>

                <td className="p-2 flex flex-col sm:flex-row gap-2">

                  {/* DETAILS */}
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/application-details/${app._id}`)
                    }
                    className=""
                  >
                    Details
                  </Button>

                  {/* FEEDBACK */}
                  <Button
                    onClick={() => navigate(`/dashboard/feedback/${app._id}`)}
                    className="bg-green-600"
                  >
                    Feedback
                  </Button>

                  {/* STATUS DROPDOWN */}
                  <select
                    className="border p-1 rounded w-28 capitalize"
                    value={app.status}
                    onChange={(e) => updateStatus(app._id, e.target.value)}
                  >
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                  </select>

                  {/* CANCEL */}
                  <Button
                    onClick={() => updateStatus(app._id, "rejected")}
                    className="bg-red-600 text-white px-3 py-1 rounded w-28"
                  >
                    Cancel
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

export default ManageApplications;
