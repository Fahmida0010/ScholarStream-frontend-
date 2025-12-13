import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import Button from "../../../components/Shared/Button/Button";

const API = "http://localhost:3000";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const res = await axios.get(`${API}/applications`);
      setApplications(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this application!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    await axios.delete(`${API}/myapplications/${id}`);
    loadApplications();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Applications
      </h2>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg">
        <table className="w-full bg-white">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 text-left">University</th>
              <th className="p-3">Subject Category</th>
              <th className="p-3">Fees</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>


            
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr
                key={app._id}
                className="border-b hover:bg-gray-100"
              >
                <td className="p-3">{app.universityName}</td>
                <td className="p-3">{app.subjectCategory}</td>
                <td className="p-3 font-semibold">
                  ${app.applicationFees}
                </td>
                <td className="p-3 capitalize">
                  {app.applicationStatus} <br />
                  <span className="text-sm text-gray-500">
                    ({app.paymentStatus})
                  </span>
                </td>
                <td className="p-3 flex flex-col md:flex-row gap-2 md:items-center">
                  <Button onClick={() => navigate(`/dashboard/application-details/${app._id}`)} 
                  className="bg-blue-500">
                    Details
                  </Button>

                  {app.applicationStatus === "pending" && (
                    <>
                      <Button
                        onClick={() => navigate(`/dashboard/edit-application/${app._id}`)}
                        className="bg-yellow-500"
                      >
                        Edit
                      </Button>

                      <Button
                        onClick={() => handleDelete(app._id)}
                        className="bg-red-500"
                      >
                        Delete
                      </Button>

                      {app.paymentStatus === "unpaid" && (
                        <Button
                          onClick={() => navigate(`//${id}`)}
                          className="bg-green-500"
                            >
                          Pay
                        </Button>
                      )}
                    </>
                  )}

                  {app.applicationStatus === "completed" && (
                    <Button
                      onClick={() =>
                        navigate(`/dashboard/add-review/${app._id}`)
                      }
                      className="bg-purple-600"
                    >
                      Add Review
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-white rounded-xl shadow p-4 space-y-2"
          >
            <h3 className="font-bold text-lg">
              {app.universityName}
            </h3>

            <p>
              <b>Category:</b> {app.subjectCategory}
            </p>

            <p>
              <b>Fees:</b> ${app.applicationFees}
            </p>

            <p className="capitalize">
              <b>Status:</b> {app.applicationStatus} <br />
              <span className="text-sm text-gray-500">
                ({app.paymentStatus})
              </span>
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                onClick={() =>
                  navigate(`/dashboard/application-details/${app._id}`)
                }
              >
                Details
              </Button>

              {app.applicationStatus === "pending" && (
                <>
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/edit-application/${app._id}`)
                    }
                    className="bg-yellow-500"
                  >
                    Edit
                  </Button>

                  <Button
                    onClick={() => handleDelete(app._id)}
                    className="bg-red-500"
                  >
                    Delete
                  </Button>

                  {app.paymentStatus === "unpaid" && (
                    <Button
                      onClick={() =>
                        navigate(`/checkout/${app._id}`)
                      }
                      className="bg-green-500"
                    >
                      Pay
                    </Button>
                  )}
                </>
              )}

              {app.applicationStatus === "completed" && (
                <Button
                  onClick={() =>
                    navigate(`/dashboard/add-review/${app._id}`)
                  }
                  className="bg-purple-600"
                >
                  Add Review
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
