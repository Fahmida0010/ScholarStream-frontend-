// import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";

const API = "http://localhost:3000"; // backend

const MyReviews = () => {
  const { user } = useAuth();
  const userEmail = user?.email;

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [editData, setEditData] = useState({
    ratingPoint: 5,
    reviewComment: "",
  });

  // Load reviews dynamically
  useEffect(() => {
    if (userEmail) loadReviews();
  }, [userEmail]);

  const loadReviews = async () => {
    try {
      const res = await axios.get(`${API}/myreviews/student/${userEmail}`);
      setReviews(res.data);
    } catch (err) {
      console.log("Error loading reviews:", err);
      Swal.fire("Error!", "Failed to load reviews", "error");
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal
  const openEditModal = (review) => {
    setCurrentReview(review);
    setEditData({
      ratingPoint: review.ratingPoint,
      reviewComment: review.reviewComment,
    });
    setIsEditModalOpen(true);
  };

  // Update review
  const handleUpdate = async () => {
    try {
      await axios.put(`${API}/myreviews/${currentReview._id}`, editData);
      Swal.fire("Success!", "Review updated!", "success");
      setIsEditModalOpen(false);
      loadReviews();
    } catch (err) {
      console.log(err);
      Swal.fire("Error!", "Failed to update review", "error");
    }
  };

  // Delete review
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${API}/myreviews/${id}`);
      Swal.fire("Deleted!", "Review deleted successfully.", "success");
      loadReviews();
    } catch (err) {
      console.log(err);
      Swal.fire("Error!", "Failed to delete review", "error");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

      {reviews.length === 0 && (
        <p className="text-gray-500">You have not added any reviews yet.</p>
      )}

      {reviews.length > 0 && (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>Scholarship</th>
              <th>University</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((r) => (
              <tr key={r._id} className="border">
                <td>{r.scholarshipName}</td>
                <td>{r.universityName}</td>
                <td>{r.reviewComment}</td>
                <td>{r.ratingPoint} ⭐</td>
                <td>{new Date(r.reviewDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="px-3 py-1 bg-blue-500 text-white mr-2 rounded"
                    onClick={() => openEditModal(r)}
                  >
                    Edit
                  </button>

                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(r._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl mb-4">Edit Review</h3>

            <label>Rating:</label>
            <input
              type="number"
              min="1"
              max="5"
              value={editData.ratingPoint}
              onChange={(e) =>
                setEditData({ ...editData, ratingPoint: Number(e.target.value) })
              }
              className="border w-full p-2 mb-3"
            />

            <label>Comment:</label>
            <textarea
              value={editData.reviewComment}
              onChange={(e) =>
                setEditData({ ...editData, reviewComment: e.target.value })
              }
              className="border w-full p-2 mb-3"
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
