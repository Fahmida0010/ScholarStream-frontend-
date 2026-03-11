import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Button from "../../../components/Shared/Button/Button";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const API = import.meta.env.VITE_API_URL;

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // GET APPLICATIONS
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`${API}/myapplications?email=${user.email}`)
      .then((res) => {
        setApplications(res.data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [user, axiosSecure]);

  // DELETE APPLICATION
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this application!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`${API}/myapplications/${id}`);

      setApplications((prev) => prev.filter((app) => app._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Application deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to delete application.",
      });
    }
  };

  // PAYMENT
  const handlePayment = async (app) => {
    try {
      const paymentInfo = {
        scholarshipName: app.scholarshipName,
        universityName: app.universityName,
        applicationFees: app.applicationFees,
        userEmail: user.email,
      };

      const res = await axiosSecure.post(
        `${API}/create-checkout-session`,
        paymentInfo
      );

      if (res.data?.url) window.location.href = res.data.url;
    } catch (err) {
      Swal.fire("Error", "Payment failed", "error");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    /* text-base-content নিশ্চিত করে ডার্ক মোডে লেখা সাদা হবে */
    <div className="max-w-7xl mx-auto px-4 py-8 text-base-content">
      <h2 className="text-3xl font-bold mb-6 text-left">My Applications</h2>

      {/* DESKTOP/TABLET */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg border border-base-300">
        {/* bg-blue-50 বদলে bg-base-100 করা হয়েছে ডার্ক মোডের জন্য */}
        <table className="w-full bg-base-100 text-sm md:text-base">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 text-left">University</th>
              <th className="p-3">Address</th>
              <th className="p-3">Subject Category</th>
              <th className="p-3">Fees</th>
              <th className="p-3">Status</th>
              <th className="p-3">Feedback</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-base-300">
            {applications.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  /* text-gray-500 বদলে text-base-content/60 */
                  className="text-center py-10 text-base-content/60 font-semibold"
                >
                  You didn't apply for any scholarship.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                /* hover:bg-gray-100 বদলে hover:bg-base-200 */
                <tr key={app._id} className="border-b border-base-300 hover:bg-base-200 transition-colors">
                  <td className="p-3 text-purple-500 font-bold">
                    {app.universityName}
                  </td>

                  <td className="p-3">{app.address}</td>

                  <td className="p-3">{app.subjectCategory}</td>

                  <td className="p-3 font-semibold">
                    ${app.applicationFees}
                  </td>

                  <td className="p-3 capitalize">
                    {app.applicationStatus}
                    <br />
                    <span className="text-sm text-green-500">
                      ({app.paymentStatus})
                    </span>
                  </td>

                  <td className="p-3">{app.feedback || "-"}</td>

                  <td className="p-3 flex flex-wrap gap-2">
                    <Button
                      onClick={() =>
                        navigate(`/dashboard/application-details/${app._id}`)
                      }
                      className="bg-blue-500 border-none text-white"
                    >
                      Details
                    </Button>

                    {app.applicationStatus === "pending" && (
                      <>
                        <Button
                          onClick={() =>
                            navigate(`/dashboard/edit-application/${app._id}`)
                          }
                          className="bg-yellow-500 border-none text-white"
                        >
                          Edit
                        </Button>

                        <Button
                          onClick={() => handleDelete(app._id)}
                          className="bg-red-500 border-none text-white"
                        >
                          Delete
                        </Button>

                        {app.paymentStatus === "unpaid" && (
                          <Button
                            onClick={() => handlePayment(app)}
                            className="bg-green-500 border-none text-white"
                          >
                            Pay
                          </Button>
                        )}
                      </>
                    )}

                    {app.applicationStatus === "completed" && (
                      <Button
                        onClick={() =>
                          navigate(`/dashboard/add-review/${app._id}`, {
                            state: {
                              scholarshipName: app.scholarshipName,
                              universityName: app.universityName,
                            },
                          })
                        }
                        className="bg-purple-600 border-none text-white"
                      >
                        Add Review
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="md:hidden space-y-4">
        {applications.length === 0 ? (
          <p className="text-center text-base-content/60 font-semibold py-10">
            You didn't apply for any scholarship.
          </p>
        ) : (
          applications.map((app) => (
            /* bg-white বদলে bg-base-100 এবং শ্যাডো ডার্ক মোড ফ্রেন্ডলি করা হয়েছে */
            <div
              key={app._id}
              className="bg-base-100 border border-base-300 rounded-xl shadow-md p-4 space-y-2"
            >
              <h3 className="font-bold text-lg text-red-500">
                {app.universityName}
              </h3>

              <p>
                <b className="text-purple-500">Address:</b> {app.address}
              </p>

              <p>
                <b className="text-purple-500">Subject Category:</b>{" "}
                {app.subjectCategory}
              </p>

              <p>
                <b className="text-purple-500">Fees:</b> $
                {app.applicationFees}
              </p>

              <p className="capitalize">
                <b className="text-purple-500">Status:</b>{" "}
                {app.applicationStatus}
                <br />
                <span className="text-sm font-bold text-green-500">
                  ({app.paymentStatus})
                </span>
              </p>

              <p>
                <b className="text-purple-500">Feedback:</b>{" "}
                {app.feedback || "-"}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  onClick={() =>
                    navigate(`/dashboard/application-details/${app._id}`)
                  }
                  className="w-full bg-blue-500 border-none text-white"
                >
                  Details
                </Button>

                {app.applicationStatus === "pending" && (
                  <>
                    <Button
                      onClick={() =>
                        navigate(`/dashboard/edit-application/${app._id}`)
                      }
                      className="w-full bg-yellow-500 border-none text-white"
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => handleDelete(app._id)}
                      className="w-full bg-red-500 border-none text-white"
                    >
                      Delete
                    </Button>

                    {app.paymentStatus === "unpaid" && (
                      <Button
                        onClick={() => handlePayment(app)}
                        className="w-full bg-green-500 border-none text-white"
                      >
                        Pay
                      </Button>
                    )}
                  </>
                )}

                {app.applicationStatus === "completed" && (
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/add-review/${app._id}`, {
                        state: {
                          scholarshipName: app.scholarshipName,
                          universityName: app.universityName,
                        },
                      })
                    }
                    className="w-full bg-purple-600 border-none text-white"
                  >
                    Add Review
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyApplications;