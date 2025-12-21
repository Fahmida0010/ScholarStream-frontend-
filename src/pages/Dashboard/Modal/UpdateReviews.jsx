import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import Button from "../../../components/Shared/Button/Button";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; 
import Swal from "sweetalert2";

const UpdateReviews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure(); 
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch single review
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await axiosSecure.get(`/reviews/${id}`);
        setReview(res.data);
      } catch (err) {
        console.error("Failed to fetch review:", err);
        Swal.fire("Error", "Failed to load review.", "error");
        navigate("/dashboard/my-reviews"); 
      }
    };
    if (id) fetchReview();
  }, [id, axiosSecure, navigate]);

  // Handle Update
  const handleUpdate = async () => {
    if (!review.reviewComment.trim()) {
      Swal.fire("Error", "Comment is required!", "error");
      return;
    }
    if (review.ratingPoint < 1 || review.ratingPoint > 5) {
      Swal.fire("Error", "Rating must be between 1 and 5!", "error");
      return;
    }

    setLoading(true);
    try {
      await axiosSecure.put(`/myreviews/${id}`, {
        reviewComment: review.reviewComment,
        ratingPoint: review.ratingPoint,
      });

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Your review has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard/my-reviews");
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire("Error", "Failed to update review. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Cancel button
  const handleCancel = () => {
    navigate("/dashboard/my-reviews");
  };

  if (!review) return <LoadingSpinner />;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Update Your Review
      </h2>

      <div className="space-y-4">
               <div>
          <label className="block mb-1 font-medium text-gray-700">Comment</label>
          <textarea
            rows="5"
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={review.reviewComment || ""}
            onChange={(e) =>
              setReview({ ...review, reviewComment: e.target.value })
            }
            placeholder="Write your updated comment..."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Rating (1-5)
          </label>
          <input
            type="number"
            min="1"
            max="5"
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500"
            value={review.ratingPoint || 1}
            onChange={(e) =>
              setReview({ ...review, ratingPoint: Number(e.target.value) })
            }
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
            <Button
            onClick={handleUpdate}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Review"}
          </Button>
          <Button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2"
            disabled={loading}
          >
            Cancel
          </Button>
        
        </div>
      </div>
    </div>
  );
};

export default UpdateReviews;