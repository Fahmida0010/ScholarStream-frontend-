import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Button from "../../../components/Shared/Button/Button";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";

const API = import.meta.env.VITE_API_URL;

const AddReview = () => {
  const { id } = useParams(); // applicationId
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
 console.log(user)
 
  const [loading, setLoading] = useState(true);
  const [scholarshipName, setScholarshipName] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axiosSecure.get(`${API}/application/${id}`);
        setScholarshipName(res.data.scholarshipName);
        setUniversityName(res.data.universityName);
        setLoading(false);
      } catch (err) {
        Swal.fire("Error", "Failed to fetch application data", "error");
        navigate(-1);
      }
    };
    fetchApplication();
  }, [id]);

  const handleSubmit = async () => {
    if (!rating || !comment) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }
 console.log("User photo:", user.photoURL);

    try {
      const res = await axiosSecure.post(`${API}/reviews`, {
        applicationId: id,
        scholarshipName,
        universityName,
        userName:user.displayName,
        userEmail: user.email,
        ratingPoint: rating,
        reviewComment: comment,
        userImage : user.photoURL
      });

      if (res.data.insertedId) {
        Swal.fire("Success!", "Review added successfully!", "success");
        navigate(-1);
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to add review", "error");
    }
  };

  if (loading) return <LoadingSpinner/>;
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-2 text-center">Add Review</h2>

        <p className="text-sm text-center text-gray-600 mb-4">
          {scholarshipName} <br />
          <span className="font-medium">{universityName}</span>
        </p>

        <label className="block mb-2">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border p-2 mb-4"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} ⭐
            </option>
          ))}
        </select>

        <textarea
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border p-2 mb-4"
          placeholder="Write your feedback..."
        />

        <div className="flex justify-between gap-3">
          <Button onClick={() => navigate(-1)} className="bg-red-500 w-full">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
