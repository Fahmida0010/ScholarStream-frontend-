import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../../components/Shared/Button/Button";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const API = import.meta.env.VITE_API_URL;

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch applications
  useEffect(() => {
    axiosSecure(`${API}/applications`)
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Update application status
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(
        `${API}/manage-application/${id}`,
        { status: newStatus }
      );

      if (res.data.modifiedCount > 0) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status: newStatus } : app
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-full mx-auto text-base-content">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Manage Applications
      </h2>

      {/* DESKTOP & TABLET TABLE */}
      <div className="hidden sm:block overflow-x-auto rounded-xl shadow-lg border border-base-300 bg-base-100">
        <table className="min-w-full text-sm sm:text-base">
          <thead className="bg-blue-500 text-white">
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">University</th>
              <th className="p-3">Status</th>
              <th className="p-3">Payment</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-t border-base-300 hover:bg-base-200 transition-colors">
                <td className="p-3">{app.userName}</td>
                <td className="p-3">{app.userEmail}</td>
                <td className="p-3">{app.universityName}</td>
                <td className="p-3 capitalize">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    app.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="p-3">
                  {app.paymentStatus === "paid" ? (
                    <span className="text-green-500 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Unpaid</span>
                  )}
                </td>
                <td className="p-3 flex items-center justify-center gap-2">
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/manage-details/${app._id}`)
                    }
                    className="btn-sm"
                  >
                    Details
                  </Button>
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/feedback/${app._id}`)
                    }
                    className="bg-green-600 btn-sm text-white border-none"
                  >
                    Feedback
                  </Button>
                  <select
                    className="border border-base-300 bg-base-100 p-1 rounded w-28 capitalize text-sm outline-none"
                    value={app.status}
                    onChange={(e) => updateStatus(app._id, e.target.value)}
                  >
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                  </select>
                  <Button
                    onClick={() => updateStatus(app._id, "rejected")}
                    className="bg-red-600 text-white btn-sm border-none"
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="sm:hidden flex flex-col gap-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="border border-base-300 p-4 rounded-lg shadow-sm bg-base-100"
          >
            <p>
              <strong>Name:</strong> {app.userName}
            </p>
            <p>
              <strong>Email:</strong> {app.userEmail}
            </p>
            <p>
              <strong>University:</strong> {app.universityName}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="capitalize font-medium text-blue-500">{app.status}</span>
            </p>
            <p>
              <strong>Payment:</strong>{" "}
              {app.paymentStatus === "paid" ? (
                <span className="text-green-500 font-semibold">Paid</span>
              ) : (
                <span className="text-red-500 font-semibold">Unpaid</span>
              )}
            </p>

            <div className="flex flex-col gap-2 mt-3">
              <Button
                onClick={() =>
                  navigate(`/dashboard/manage-details/${app._id}`)
                }
                className="w-full"
              >
                Details
              </Button>
              <Button
                onClick={() => navigate(`/dashboard/feedback/${app._id}`)}
                className="bg-green-600 w-full text-white border-none"
              >
                Feedback
              </Button>
              <select
                className="border border-base-300 bg-base-100 p-2 rounded w-full capitalize outline-none"
                value={app.status}
                onChange={(e) => updateStatus(app._id, e.target.value)}
              >
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
              </select>
              <Button
                onClick={() => updateStatus(app._id, "rejected")}
                className="bg-red-600 text-white w-full border-none"
              >
                Cancel
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageApplications;