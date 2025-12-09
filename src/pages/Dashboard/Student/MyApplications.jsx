import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000"; // backend base URL

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Review modal states
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentAppForReview, setCurrentAppForReview] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    loadApplications();
  }, []);

  // =========================
  // LOAD APPLICATIONS (GET)
  // =========================
  const loadApplications = async () => {
    try {
      const res = await axios.get(`${API}/applications`);
      setApplications(res.data);
    } catch (err) {
      console.log("Error loading apps:", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EDIT (PUT)
  // =========================
  const handleEdit = async (id) => {
    alert(`Edit modal open korte hobe – ID: ${id}`);
    // Example axios update:
    // await axios.put(`${API}/applications/${id}`, { subjectCategory: "Updated" });
  };

  // =========================
  // PAYMENT (POST)
  // =========================
  const handlePay = async (id) => {
    if (!window.confirm("Proceed with payment?")) return;
    try {
      await axios.post(`${API}/applications/pay/${id}`);
      alert("Payment successful");
      loadApplications();
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  // =========================
  // DELETE (DELETE)
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await axios.delete(`${API}/applications/${id}`);
      alert("Application deleted");
      loadApplications();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  // =========================
  // DETAILS (VIEW ONLY)
  // =========================
  const handleDetails = (id) => {
    const app = applications.find((a) => a._id === id);
    alert(
      `University: ${app.universityName}\nFees: ${app.applicationFees}\nStatus: ${app.applicationStatus}`
    );
  };

  // =========================
  // OPEN REVIEW MODAL
  // =========================
  const openReviewModal = (id) => {
    const app = applications.find((a) => a._id === id);
    setCurrentAppForReview(app);
    setReviewData({ rating: 5, comment: "" });
    setIsReviewModalOpen(true);
  };

  // =========================
  // SUBMIT REVIEW (POST)
  // =========================
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
      alert(err.response?.data?.message || "Failed to submit review");
    }
  };

  // =========================
  // UI STARTS
  // =========================

  if (loading) return <p>Loading applications...</p>;

  return (
    <div className="my-applications">
      <h2>My Applications</h2>

      <table>
        <thead>
          <tr>
            <th>University</th>
            <th>Address</th>
            <th>Feedback</th>
            <th>Category</th>
            <th>Fees</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.universityName}</td>
              <td>{app.universityAddress}</td>
              <td>{app.feedback}</td>
              <td>{app.subjectCategory}</td>
              <td>${app.applicationFees}</td>
              <td>
                <b>{app.applicationStatus}</b> ({app.paymentStatus})
              </td>

              <td>
                <button onClick={() => handleDetails(app._id)}>Details</button>

                {app.applicationStatus === "pending" && (
                  <>
                    <button onClick={() => handleEdit(app._id)}>Edit</button>
                    <button onClick={() => handleDelete(app._id)}>Delete</button>

                    {app.paymentStatus === "unpaid" && (
                      <button onClick={() => handlePay(app._id)}>Pay</button>
                    )}
                  </>
                )}

                {app.applicationStatus === "completed" && (
                  <button onClick={() => openReviewModal(app._id)}>
                    Add Review
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

       {/* ----------------------- Review Modal ----------------------- */}
      {isReviewModalOpen && (
        <div className="modal">
          <h3>Add Review for {currentAppForReview.universityName}</h3>

          <input
            type="number"
            min="1"
            max="5"
            value={reviewData.rating}
            onChange={(e) =>
              setReviewData({ ...reviewData, rating: Number(e.target.value) })
            }
          />

          <textarea
            value={reviewData.comment}
            onChange={(e) =>
              setReviewData({ ...reviewData, comment: e.target.value })
            }
            placeholder="Write your comment"
          />

          <button onClick={handleReviewSubmit}>Submit</button>
          <button onClick={() => setIsReviewModalOpen(false)}>Cancel</button>
        </div>
      )} 
    </div>
  );
};

export default MyApplications;
