import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2"; 

const Feedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [feedbackText, setFeedbackText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosSecure.post(`/feedback/${id}`, {
        feedbackText,
        adminEmail: "admin@email.com", 
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Feedback Submitted",
          text: "Feedback has been successfully submitted.",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate(-1); 
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    /* bg-white বদলে bg-base-100 এবং শ্যাডোর জন্য shadow-xl ব্যবহার করা হয়েছে */
    <div className="max-w-xl mx-auto bg-base-100 p-8 rounded-2xl shadow-xl border border-base-300">
      <h2 className="text-2xl font-bold mb-6 text-base-content">Give Feedback</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          /* border বদলে textarea এবং textarea-bordered ব্যবহার করা হয়েছে dark mode এর জন্য */
          className="textarea textarea-bordered w-full p-3 rounded-lg bg-base-200 text-base-content focus:textarea-primary"
          rows="5"
          placeholder="Write feedback..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Submit Feedback"
          )}
        </button>
      </form>
    </div>
  );
};

export default Feedback;