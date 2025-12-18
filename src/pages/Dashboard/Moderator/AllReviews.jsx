import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import Button from "../../../components/Shared/Button/Button";

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
    return <LoadingSpinner/>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">All Student Reviews</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reviews.length === 0 && (
          <p className="text-center col-span-2 text-gray-500">
            No reviews found.
          </p>
        )}

        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white p-5 shadow-md rounded-lg border"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={review.userImage}
                className="h-12 w-12 rounded-full object-cover"
                alt=""
              />
              <div>
                <h2 className="font-semibold text-lg">{review.userName}</h2>
                <p className="text-gray-500 text-sm">{review.userEmail}</p>
              </div>
            </div>

            <p className="text-gray-700 mb-2">{review.reviewComment}</p>

            <p className="text-yellow-500 mb-1">⭐ {review.ratingPoint} / 5</p>

            <p className="text-gray-400 text-sm">
              {new Date(review.reviewDate).toLocaleDateString()}
            </p>

            <Button
              onClick={() => handleDelete(review._id)}
              className="bg-red-500 hover:bg-red-700"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
