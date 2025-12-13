import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const UpdateReviews = () => {
  const { id } = useParams(); // review ID from URL
  const navigate = useNavigate();
  const [review, setReview] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/reviews/${id}`);
        setReview(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReview();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/reviews/${id}`, {
        reviewComment: review.reviewComment,
        ratingPoint: review.ratingPoint,
      });
      navigate("/my-reviews"); // go back after update
    } catch (err) {
      console.log(err);
    }
  };

  if (!review) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Review</h2>

      <label className="block mb-1 font-medium">Comment</label>
      <textarea
        className="w-full border p-2 mb-3"
        value={review.reviewComment}
        onChange={(e) =>
          setReview({ ...review, reviewComment: e.target.value })
        }
      />

      <label className="block mb-1 font-medium">Rating (1-5)</label>
      <input
        type="number"
        min="1"
        max="5"
        className="w-full border p-2 mb-4"
        value={review.ratingPoint}
        onChange={(e) =>
          setReview({ ...review, ratingPoint: Number(e.target.value) })
        }
      />

      <div className="flex justify-end gap-2">
        <button onClick={handleUpdate} className="btn btn-success">
          Update
        </button>
        <button onClick={() => navigate("/my-reviews")} className="btn btn-ghost">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateReviews;
