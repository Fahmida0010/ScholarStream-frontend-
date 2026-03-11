import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import Button from "../../../components/Shared/Button/Button";
import { format } from "date-fns";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/reviews")
      .then((res) => {
        setReviews(res.data || []);
      })
      .catch((err) => console.log("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/reviews/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setReviews(reviews.filter((item) => item._id !== id));

              Swal.fire({
                title: "Deleted!",
                text: "The review has been removed.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            } else {
              Swal.fire("Error!", "Failed to delete review.", "error");
            }
          })
          .catch((err) => {
            console.log("Delete error:", err);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="text-base-content">
      <h1 className="text-2xl font-bold mb-5">All Student Reviews</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reviews.length === 0 && (
          <p className="text-center col-span-2 text-gray-500 opacity-70">
            No reviews found.
          </p>
        )}

        {reviews.map((review) => (
          <div
            key={review._id}
            /* bg-white বদলে bg-base-100 এবং বর্ডার অ্যাডজাস্ট করা হয়েছে */
            className="bg-base-100 p-5 shadow-md rounded-lg border border-base-300 transition-colors duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={review.userImage}
                className="h-12 w-12 rounded-full object-cover border border-base-300"
                alt=""
              />
              <div>
                <h2 className="font-semibold text-lg">{review.userName}</h2>
                <p className="text-base-content opacity-60 text-sm">{review.userEmail}</p>
              </div>
            </div>
            
            {/* ডার্ক মোডে পড়ার সুবিধার জন্য টেক্সট কালার কিছুটা ব্রাইট রাখা হয়েছে */}
            <p className="text-pink-600 dark:text-pink-400 mb-2 font-semibold">
              {review.universityName}
            </p>
            <p className="text-indigo-600 dark:text-indigo-400 font-bold mb-2">
              {review.scholarshipName}
            </p>
            <p className="text-green-600 dark:text-green-400 mb-2">
              {review.reviewComment}
            </p>

            <p className="text-yellow-500 mb-1">⭐ {review.ratingPoint} / 5</p>

            <p className="text-base-content opacity-50 text-sm mb-4">
              {review.createdAt ? format(new Date(review.createdAt), "dd/MM/yyyy") : "-"}
            </p>

            <Button
              onClick={() => handleDelete(review._id)}
              className="bg-red-500 hover:bg-red-700 text-white border-none w-full sm:w-auto"
            >
              Delete Review
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;