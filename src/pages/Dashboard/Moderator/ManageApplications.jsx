// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router"; 
// import Button from "../../../components/Shared/Button/Button";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";


// const API = import.meta.env.VITE_API_URL;

// const ManageApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//    const axiosSecure = useAxiosSecure();

//   //  GET all applications 
//   useEffect(() => {
//     axiosSecure(`${API}/applications`)
//       .then((res) => {
//         setApplications(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   //  Update application status
//   const updateStatus = async (id, newStatus) => {
//     try {
//       const res = await axiosSecure.patch(
//         `${API}/manage-application/${id}`,
//         { status: newStatus }
//       );

//       if (res.data.modifiedCount > 0) {
//         setApplications((prev) =>
//           prev.map((app) =>
//             app._id === id ? { ...app, status: newStatus } : app
//           )
//         );
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (loading) return <LoadingSpinner />;


//   console.log(applications)
//   return (
//     <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Manage Applications</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200">
//           <thead className="bg-gray-200">
//             <tr className="text-left text-sm">
//               <th className="p-2">Name</th>
//               <th className="p-2">Applicant Email</th>
//               <th className="p-2">University</th>
//               <th className="p-2">Status</th>
//               <th className="p-2">Payment</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {applications.map((app) => (
//               <tr key={app._id} className="border-t text-sm">
//                 <td className="p-2">{app.userName}</td>
//                 <td className="p-2">{app.userEmail}</td>
//                 <td className="p-2">{app.universityName}</td>

//                 <td className="p-2 capitalize">{app.status}</td>

//                 {/* PAYMENT STATUS */}
//                 <td className="p-2">
//                   {app.paymentStatus === "paid" ? (
//                     <span className="text-green-600 font-semibold">Paid</span>
//                   ) : (
//                     <span className="text-red-600 font-semibold">Unpaid</span>
//                   )}
//                 </td>

//                 <td className="p-2 flex flex-col sm:flex-row gap-2">
//                   {/* DETAILS */}
//                   <Button
//                     onClick={() =>
//                       navigate(`/dashboard/application-details/${app._id}`)
//                     }
//                   >
//                     Details
//                   </Button>

//                   {/* FEEDBACK */}
//                   <Button
//                     onClick={() =>
//                       navigate(`/dashboard/feedback/${app._id}`)
//                     }
//                     className="bg-green-600"
//                   >
//                     Feedback
//                   </Button>

//                   {/* STATUS DROPDOWN */}
//                   <select
//                     className="border p-1 rounded w-28 capitalize"
//                     value={app.status}
//                     onChange={(e) =>
//                       updateStatus(app._id, e.target.value)
//                     }
//                   >
//                     <option value="processing">Processing</option>
//                     <option value="completed">Completed</option>
//                   </select>

//                   {/* CANCEL */}
//                   <Button
//                     onClick={() =>
//                       updateStatus(app._id, "rejected")
//                     }
//                     className="bg-red-600 text-white px-3 py-1 rounded w-28"
//                   >
//                     Cancel
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageApplications;

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
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Manage Applications
      </h2>

      {/* DESKTOP & TABLET TABLE */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm sm:text-base">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">University</th>
              <th className="p-2">Status</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-t">
                <td className="p-2">{app.userName}</td>
                <td className="p-2">{app.userEmail}</td>
                <td className="p-2">{app.universityName}</td>
                <td className="p-2 capitalize">{app.status}</td>
                <td className="p-2">
                  {app.paymentStatus === "paid" ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Unpaid</span>
                  )}
                </td>
                <td className="p-2 flex flex-wrap gap-2">
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/application-details/${app._id}`)
                    }
                  >
                    Details
                  </Button>
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/feedback/${app._id}`)
                    }
                    className="bg-green-600"
                  >
                    Feedback
                  </Button>
                  <select
                    className="border p-1 rounded w-28 capitalize "
                    value={app.status}
                    onChange={(e) => updateStatus(app._id, e.target.value)}
                  >
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                  </select>
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

      {/* MOBILE CARDS */}
      <div className="sm:hidden flex flex-col gap-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="border p-4 rounded-lg shadow-sm bg-white"
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
              <span className="capitalize">{app.status}</span>
            </p>
            <p>
              <strong>Payment:</strong>{" "}
              {app.paymentStatus === "paid" ? (
                <span className="text-green-600 font-semibold">Paid</span>
              ) : (
                <span className="text-red-600 font-semibold">Unpaid</span>
              )}
            </p>

            <div className="flex flex-col gap-2 mt-2">
              <Button
                onClick={() =>
                  navigate(`/dashboard/application-details/${app._id}`)
                }
                className="w-full"
              >
                Details
              </Button>
              <Button
                onClick={() => navigate(`/dashboard/feedback/${app._id}`)}
                className="bg-green-600 w-full"
              >
                Feedback
              </Button>
              <select
                className="border p-1 rounded w-full capitalize"
                value={app.status}
                onChange={(e) => updateStatus(app._id, e.target.value)}
              >
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
              </select>
              <Button
                onClick={() => updateStatus(app._id, "rejected")}
                className="bg-red-600 text-white w-full"
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
