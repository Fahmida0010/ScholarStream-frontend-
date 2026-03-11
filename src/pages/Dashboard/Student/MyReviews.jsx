import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import Button from "../../../components/Shared/Button/Button";
import { format } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const loadReviews = async () => {
    try {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/myreviews?email=${user.email}`
      );
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to load reviews:", error);
    }
  };

  useEffect(() => {
    if (user?.email) loadReviews();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(
        `${import.meta.env.VITE_API_URL}/myreviews/${id}`
      );
      loadReviews();

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Review has been deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 text-base-content transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>

      {/* EMPTY STATE - text-gray-500 changed to text-base-content/60 */}
      {reviews.length === 0 && (
        <div className="text-center py-20 text-base-content/60">
          <p className="text-xl font-semibold">
            No reviews have been submitted yet.
          </p>
          <p className="text-sm mt-2">
            Apply for scholarships and share your 
            experience by leaving a review.
          </p>
        </div>
      )}

      {/* Desktop */}
      {reviews.length > 0 && (
        <div className="hidden lg:block overflow-x-auto">
          {/* Added border-base-300 */}
          <table className="w-full border border-base-300 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-green-600 to-yellow-500 text-white">
              <tr>
                <th className="p-3 text-left">Scholarship</th>
                <th className="p-3 text-left">University</th>
                <th className="p-3 text-left">Comment</th>
                <th className="p-3 text-center">Rating</th>
                <th className="p-3 text-center">Date</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            {/* bg-white changed to bg-base-100, divide color updated */}
            <tbody className="bg-base-100 divide-y divide-base-300">
              {reviews.map((review) => (
                <tr key={review._id} className="hover:bg-base-200 transition-colors">
                  <td className="p-3 font-semibold text-indigo-400">
                    {review.scholarshipName}
                  </td>

                  <td className="p-3 font-bold text-pink-500">
                    {review.universityName}
                  </td>

                  <td className="p-3">{review.reviewComment}</td>

                  <td className="p-3 text-center text-amber-500 font-semibold">
                    ⭐ {review.ratingPoint}
                  </td>

                  <td className="p-3 text-center">
                    {review.createdAt
                      ? format(new Date(review.createdAt), "dd/MM/yyyy")
                      : "-"}
                  </td>

                  <td className="p-3 text-center space-x-2">
                    <Button
                      onClick={() =>
                        navigate(`/dashboard/update-reviews/${review._id}`)
                      }
                      className="bg-indigo-500 text-white border-none mb-4"
                    >
                      Update
                    </Button>

                    <Button
                      onClick={() => handleDelete(review._id)}
                      className="bg-red-500 text-white border-none"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tablet */}
      {reviews.length > 0 && (
        <div className="hidden md:grid lg:hidden grid-cols-2
          gap-4">
          {reviews.map((review) => (
            /* bg-white changed to bg-base-100, border updated */
            <div
              key={review._id}
              className="border border-base-300 rounded-lg p-4 shadow-sm bg-base-100 space-y-2 transition-colors"
            >
              <h3 className="font-semibold text-indigo-400">
                {review.scholarshipName}
              </h3>

              <p className="text-sm font-bold text-pink-500">
                {review.universityName}
              </p>

              <p className="text-base-content/80 line-clamp-3">
                {review.reviewComment}
              </p>

              <div className="flex justify-between text-sm">
                <span className="text-amber-500 font-semibold">
                  ⭐ {review.ratingPoint}
                </span>

                <span className="text-base-content/60">
                  {review.createdAt
                    ? format(new Date(review.createdAt), "dd/MM/yyyy")
                    : "-"}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() =>
                    navigate(`/dashboard/update-reviews/${review._id}`)
                  }
                  className="flex-1 bg-indigo-500 text-white border-none"
                >
                  Update
                </Button>

                <Button
                  onClick={() => handleDelete(review._id)}
                  className="flex-1 bg-red-500 text-white border-none"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile */}
      {reviews.length > 0 && (
        <div className="md:hidden space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-base-100 border border-base-300 rounded-lg shadow-sm p-4 space-y-2 transition-colors"
            >
              <h3 className="font-semibold text-indigo-400">
                {review.scholarshipName}
              </h3>

              <p className="text-sm font-bold text-pink-500">
                {review.universityName}
              </p>

              <p className="text-base-content/80">{review.reviewComment}</p>

              <div className="flex justify-between text-sm">
                <span className="text-amber-500 font-semibold">
                  ⭐ {review.ratingPoint}
                </span>

                <span className="text-base-content/60">
                  {review.createdAt
                    ? new Date(review.createdAt).toLocaleDateString()
                    : "-"}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() =>
                    navigate(`/dashboard/update-reviews/${review._id}`)
                  }
                  className="flex-1 py-1 rounded bg-blue-500 text-white font-medium"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(review._id)}
                  className="flex-1 py-1 rounded bg-red-500 text-white font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;