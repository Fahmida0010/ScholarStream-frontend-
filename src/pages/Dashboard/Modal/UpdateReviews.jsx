import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import Button from "../../../components/Shared/Button/Button";

const UpdateReviews = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [review, setReview] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
        setReview(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReview();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/myreviews/${id}`, {
        reviewComment: review.reviewComment,
        ratingPoint: review.ratingPoint,
      });
      navigate("/my-reviews"); 
    } catch (err) {
      console.log(err);
    }
  };

  if (!review) return <LoadingSpinner/>

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

      <div className=" justify-end gap-2">
        <Button onClick={handleUpdate} className="btn bg-green-500 ">
          Update
        </Button>
        <Button onClick={() => navigate("/my-reviews")}
         className="btn btn-ghost">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default UpdateReviews;
