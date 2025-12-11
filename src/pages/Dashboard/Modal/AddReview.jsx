import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const API = "http://localhost:3000"; // change if needed

const AddReview = ({ applicationId, onClose, loadApplications }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!rating || !comment) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    try {
      const res = await axios.post(`${API}/reviews`, {
        applicationId,
        rating,
        comment,
      });

      if (res.data.insertedId) {
        Swal.fire("Success!", "Review added successfully!", "success");
        // loadApplications(); // refresh parent table
        // onClose(); // close modal
      }
    } catch (err) {
      console.log(err)
      Swal.fire("Error!", "Failed to add review", "error");
    }
  };

  return (
    <div className=" flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">

        <h2 className="text-xl font-bold mb-4 text-center">Add Review</h2>

        {/* Rating */}
        <label className="block mb-2 font-medium">Rating (1-5 ⭐)</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="1">1 ⭐</option>
          <option value="2">2 ⭐⭐</option>
          <option value="3">3 ⭐⭐⭐</option>
          <option value="4">4 ⭐⭐⭐⭐</option>
          <option value="5">5 ⭐⭐⭐⭐⭐</option>
        </select>

        {/* Comment */}
        <label className="block mb-2 font-medium">Comment</label>
        <textarea
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Write your feedback..."
        ></textarea>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
