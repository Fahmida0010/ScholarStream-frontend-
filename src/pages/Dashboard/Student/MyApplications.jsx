// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";

// const API = "http://localhost:3000"; // backend base URL

// const MyApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Review modal states
//   const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
//   const [currentAppForReview, setCurrentAppForReview] = useState(null);
//   const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });

//   useEffect(() => {
//     loadApplications();
//   }, []);

//   // =========================
//   // LOAD APPLICATIONS (GET)
//   // =========================
//   const loadApplications = async () => {
//     try {
//       const res = await axios.get(`${API}/applications`);
//       setApplications(res.data);
//     } catch (err) {
//      console.log("Error loading apps:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // EDIT (PUT)
//   // =========================
//   const handleEdit = async (id) => {
//     alert(`Edit modal open korte hobe – ID: ${id}`);
//     // Example axios update:
//     // await axios.put(`${API}/applications/${id}`, { subjectCategory: "Updated" });
//   };

//   // =========================
//   // PAYMENT (POST)
//   // =========================
//   const handlePay = async (id) => {
//     if (!window.confirm("Proceed with payment?")) return;
//     try {
//       await axios.post(`${API}/applications/pay/${id}`);
//       alert("Payment successful");
//       loadApplications();
//     } catch (err) {
//       alert(err.response?.data?.message || "Payment failed");
//     }
//   };

//   // =========================
//   // DELETE (DELETE)
//   // =========================
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this application?")) return;
//     try {
//       await axios.delete(`${API}/applications/${id}`);
//       alert("Application deleted");
//       loadApplications();
//     } catch (err) {
//       alert(err.response?.data?.message || "Delete failed");
//     }
//   };

//   // =========================
//   // DETAILS (VIEW ONLY)
//   // =========================
//   const handleDetails = (id) => {
//     const app = applications.find((a) => a._id === id);
//     alert(
//       `University: ${app.universityName}\nFees: ${app.applicationFees}\nStatus: ${app.applicationStatus}`
//     );
//   };

//   // =========================
//   // OPEN REVIEW MODAL
//   // =========================
//   const openReviewModal = (id) => {
//     const app = applications.find((a) => a._id === id);
//     setCurrentAppForReview(app);
//     setReviewData({ rating: 5, comment: "" });
//     setIsReviewModalOpen(true);
//   };

//   // =========================
//   // SUBMIT REVIEW (POST)
//   // =========================
//   const handleReviewSubmit = async () => {
//     try {
//       await axios.post(`${API}/reviews`, {
//         applicationId: currentAppForReview._id,
//         universityName: currentAppForReview.universityName,
//         rating: reviewData.rating,
//         reviewComment: reviewData.comment,
//       });

//       alert("Review submitted!");
//       setIsReviewModalOpen(false);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to submit review");
//     }
//   };

//   // =========================
//   // UI STARTS
//   // =========================

//   if (loading) return <LoadingSpinner/>
  

//   return (
//     <div className="my-applications">
//       <h2 className="text-2xl font-bold mb-5">My Applications</h2>

//       <table className="w-full bg-green-200  text-left
//       shadow rounded-xl">
//         <thead>
//           <tr>
//             <th>University</th>
//             <th>Address</th>
//             <th>Feedback</th>
//             <th>Category</th>
//             <th>Fees</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {applications.map((app) => (
//             <tr key={app._id}>
//               <td>{app.universityName}</td>
//               <td>{app.universityAddress}</td>
//               <td>{app.feedback}</td>
//               <td>{app.subjectCategory}</td>
//               <td>${app.applicationFees}</td>
//               <td>
//                 <b>{app.applicationStatus}</b> ({app.paymentStatus})
//               </td>

//               <td>
//                 <button onClick={() => handleDetails(app._id)}>Details</button>

//                 {app.applicationStatus === "pending" && (
//                   <>
//                     <button onClick={() => handleEdit(app._id)}>Edit</button>
//                     <button onClick={() => handleDelete(app._id)}>Delete</button>

//                     {app.paymentStatus === "unpaid" && (
//                       <button onClick={() => handlePay(app._id)}>Pay</button>
//                     )}
//                   </>
//                 )}

//                 {app.applicationStatus === "completed" && (
//                   <button onClick={() => openReviewModal(app._id)}>
//                     Add Review
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//        {/* ----------------------- Review Modal ----------------------- */}
//       {isReviewModalOpen && (
//         <div className="modal">
//           <h3>Add Review for {currentAppForReview.universityName}</h3>

//           <input
//             type="number"
//             min="1"
//             max="5"
//             value={reviewData.rating}
//             onChange={(e) =>
//               setReviewData({ ...reviewData, rating: Number(e.target.value) })
//             }
//           />

//           <textarea
//             value={reviewData.comment}
//             onChange={(e) =>
//               setReviewData({ ...reviewData, comment: e.target.value })
//             }
//             placeholder="Write your comment"
//           />

//           <button onClick={handleReviewSubmit}>Submit</button>
//           <button onClick={() => setIsReviewModalOpen(false)}>Cancel</button>
//         </div>
//       )} 
//     </div>
//   );
// };

// export default MyApplications;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";

const API = "http://localhost:3000";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Review modal states
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentAppForReview, setCurrentAppForReview] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    loadApplications();
  }, []);

  // LOAD APPLICATIONS
  const loadApplications = async () => {
    try {
      const res = await axios.get(`${API}/applications`);
      setApplications(res.data);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // DETAILS PAGE ROUTE
  const handleDetails = (id) => {
    navigate(`/dashboard/application-details/${id}`);
  };

  // EDIT PAGE ROUTE
  const handleEdit = (id) => {
    navigate(`/dashboard/edit-application/${id}`);
  };

  // PAY PAGE ROUTE
  const handlePay = (id) => {
    navigate(`/checkout`);
  };

const handleDelete = async (id) => {
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "You want to delete this application!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  });

  if (!confirm.isConfirmed) return;

  try {
    const res = await axios.delete(`${API}/myapplications/${id}`);

    if (res.data.deletedCount > 0) {
      Swal.fire("Deleted!", "Application deleted successfully.", "success");
      loadApplications(); // refresh
    } else {
      Swal.fire("Error!", "Delete failed!", "error");
    }

  } catch (err) {
    Swal.fire("Error!", "Delete failed! Server error.", "error");
  }
};


  // OPEN REVIEW MODAL
  const openReviewModal = (id) => {
    const app = applications.find((a) => a._id === id);
    setCurrentAppForReview(app);
    setIsReviewModalOpen(true);
  };

  // SUBMIT REVIEW
  const handleReviewSubmit = async () => {
    try {
      await axios.post(`${API}/reviews`, {
        applicationId: currentAppForReview._id,
        universityName: currentAppForReview.universityName,
        rating: reviewData.rating,
        reviewComment: reviewData.comment,
      });

      alert("Review submitted!");
      setIsReviewModalOpen(false);
    } catch (err) {
      alert("Failed to submit review");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Applications</h2>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="w-full bg-white">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 text-left">University</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Feedback</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Fees</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr
                key={app._id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-3">{app.universityName}</td>
                <td className="p-3">{app.universityAddress}</td>
                <td className="p-3">{app.feedback || "—"}</td>
                <td className="p-3">{app.subjectCategory}</td>
                <td className="p-3 font-semibold">${app.applicationFees}</td>

                <td className="p-3">
                  <span className="font-bold capitalize">
                    {app.applicationStatus}
                  </span>
                  <br />
                  <span className="text-sm text-gray-600">
                    ({app.paymentStatus})
                  </span>
                </td>

                <td className="p-3 flex flex-wrap gap-2">
                  {/* DETAILS BUTTON */}
                  <button
                    onClick={() => handleDetails(app._id)}
                    className="px-3 py-1 bg-blue-600 text-white 
                    rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Details
                  </button>

                  {app.applicationStatus === "pending" && (
                    <>
                      {/* EDIT BUTTON */}
                      <button
                        onClick={() => handleEdit(app._id)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm"
                      >
                        Edit
                      </button>

                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>

                      {/* PAY BUTTON */}
                      {app.paymentStatus === "unpaid" && (
                        <button
                          onClick={() => handlePay(app._id)}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                        >
                          Pay
                        </button>
                      )}
                    </>
                  )}

                  {/* ADD REVIEW */}
                  {app.applicationStatus === "completed" && (
                   <button
     onClick={() => navigate(`/dashboard/add-review/:id`)}
  className="px-3 py-1 bg-purple-600 text-white 
             rounded-lg hover:bg-purple-700 text-sm"
>
  Add Review
</button>

                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* REVIEW MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              Add Review for {currentAppForReview.universityName}
            </h3>

            <label className="block mb-2">Rating (1–5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={reviewData.rating}
              onChange={(e) =>
                setReviewData({ ...reviewData, rating: Number(e.target.value) })
              }
              className="border p-2 rounded w-full mb-3"
            />

            <textarea
              value={reviewData.comment}
              onChange={(e) =>
                setReviewData({ ...reviewData, comment: e.target.value })
              }
              placeholder="Write your comment"
              className="border p-2 rounded w-full h-24 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
