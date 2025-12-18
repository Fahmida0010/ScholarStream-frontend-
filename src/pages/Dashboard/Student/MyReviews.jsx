// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import useAuth from "../../../hooks/useAuth";
// import Swal from "sweetalert2";
// import Button from "../../../components/Shared/Button/Button";

// const MyReviews = () => {
//   const { user } = useAuth();
//   const [reviews, setReviews] = useState([]);
//   const navigate = useNavigate();

//   const loadReviews = async () => {
//     const res = await axios.get(
//       `${import.meta.env.VITE_API_URL}/reviews?email=${user.email}`
//     );
//     setReviews(res.data);
//   };

//   useEffect(() => {
//     if (user?.email) loadReviews();
//   }, [user]);

//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#6366f1",
//       cancelButtonColor: "#ef4444",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
//         Swal.fire("Deleted!", "Your review has been deleted.", "success");
//         loadReviews();
//       } catch {
//         Swal.fire("Error!", "Failed to delete review.", "error");
//       }
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       {/* Title */}
//       <h2 className="text-2xl font-bold mb-4">
//         My Reviews
//       </h2>

//       {/* ===== Desktop Table ===== */}
//       <div className="hidden md:block overflow-x-auto">
//         <table className="w-full border rounded-lg overflow-hidden">
//           <thead className="bg-gradient-to-r from-green-500 to-yellow-400 text-white">
//             <tr>
//               <th className="p-3 text-left">Scholarship</th>
//               <th className="p-3 text-left">University</th>
//               <th className="p-3 text-left">Comment</th>
//               <th className="p-3 text-center">Rating</th>
//               <th className="p-3 text-center">Date</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody className="bg-white divide-y">
//             {reviews.map((review) => (
//               <tr key={review._id} className="hover:bg-gray-50">
//                 <td className="p-3 font-semibold text-indigo-600">
//                   {review.scholarshipName}
//                 </td>
//                 <td className="p-3 text-sm font-bold text-pink-800">{review.universityName}</td>
//                 <td className="p-3 text-black">
//                   {review.reviewComment}
//                 </td>
//                 <td className="p-3 text-center font-semibold text-amber-500">
//                   ⭐ {review.ratingPoint}
//                 </td>
//                 <td className="p-3 text-center text-gray-700">
//                   {new Date(review.reviewDate).toLocaleDateString()}
//                 </td>
//                 <td className="p-3 text-center space-x-2">
//                   <Button
//                     onClick={() =>
//                       navigate(`/update-reviews/${review._id}`)
//                     }
//                     className="px-3 py-1 rounded bg-indigo-500 text-white hover:bg-indigo-600"
//                   >
//                     Update
//                   </Button>
//                   <Button
//                     onClick={() => handleDelete(review._id)}
//                     className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ===== Mobile Cards ===== */}
//       <div className="md:hidden space-y-4">
//         {reviews.map((review) => (
//           <div
//             key={review._id}
//             className="bg-white border rounded-lg shadow-sm p-4 space-y-2"
//           >
//             <h3 className="font-semibold text-indigo-600">
//               {review.scholarshipName}
//             </h3>
//             <p className="text-sm font-bold text-pink-800">
//               {review.universityName}
//             </p>

//             <p className="text-black">
//               {review.reviewComment}
//             </p>

//             <div className="flex justify-between text-sm">
//               <span className="text-amber-500 font-semibold">
//                 ⭐ {review.ratingPoint}
//               </span>
//               <span className="text-gray-800">
//                 {new Date(review.reviewDate).toLocaleDateString()}
//               </span>
//             </div>

//             <div className="flex gap-2 pt-2">
//               <button
//                 onClick={() =>
//                   navigate(`/update-reviews/${review._id}`)
//                 }
//                 className="flex-1 py-1 rounded bg-blue-500 text-white"
//               >
//                 Update
//               </button>
//               <button
//                 onClick={() => handleDelete(review._id)}
//                 className="flex-1 py-1 rounded bg-red-500 text-white"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyReviews;



import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import Button from "../../../components/Shared/Button/Button";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { compareAsc, format } from "date-fns";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
 const axiosSecure = useAxiosSecure()
  const loadReviews = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/reviews?email=${user.email}`
    );
    setReviews(res.data);
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

    // reload data
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

 console.log(reviews)

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>

      {/* ================= Desktop (lg+) ================= */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-green-500 to-yellow-400 text-white">
            <tr>
              <th className="p-3 text-left">Scholarship</th>
              <th className="p-3 text-left">University</th>
              <th className="p-3 text-left">Comment</th>
              <th className="p-3 text-center">Rating</th>
              <th className="p-3 text-center">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y">
            {reviews.map((review) => (
              <tr key={review._id} className="hover:bg-gray-50">
                <td className="p-3 font-semibold text-indigo-600">
                  {review.scholarshipName}
                </td>
                <td className="p-3 font-bold text-pink-800">
                  {review.universityName}
                </td>
                <td className="p-3">{review.reviewComment}</td>
                <td className="p-3 text-center text-amber-500 font-semibold">
                  ⭐ {review.ratingPoint}
                </td>
                { review.createdAt && 
                <td className="p-3 text-center">
                 {new Date(review.createdAt).toLocaleDateString()}
                 
                </td>}
                <td className="p-3 text-center space-x-2">
                  <Button
                    onClick={() =>
                      navigate(`/dashboard/update-reviews/${review._id}`)
                    }
                    className="bg-indigo-500 text-white"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDelete(review._id)}
                    className="bg-red-500 text-white"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Tablet (md) ================= */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border rounded-lg p-4 shadow-sm bg-white space-y-2"
          >
            <h3 className="font-semibold text-indigo-600">
              {review.scholarshipName}
            </h3>
            <p className="text-sm font-bold text-pink-800">
              {review.universityName}
            </p>

            <p className="text-gray-800 line-clamp-3">
              {review.reviewComment}
            </p>

            <div className="flex justify-between text-sm">
              <span className="text-amber-500 font-semibold">
                ⭐ {review.ratingPoint}
              </span>
              <span>
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={() =>
                  navigate(`/dashboard/update-reviews/${review._id}`)
                }
                className="flex-1 bg-indigo-500 text-white"
              >
                Update
              </Button>
              <Button
                onClick={() => handleDelete(review._id)}
                className="flex-1 bg-red-500 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= Mobile ================= */}
      <div className="md:hidden space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white border rounded-lg shadow-sm p-4 space-y-2"
          >
            <h3 className="font-semibold text-indigo-600">
              {review.scholarshipName}
            </h3>
            <p className="text-sm font-bold text-pink-800">
              {review.universityName}
            </p>

            <p>{review.reviewComment}</p>

            <div className="flex justify-between text-sm">
              <span className="text-amber-500 font-semibold">
                ⭐ {review.ratingPoint}
              </span>
              <span>
                {new Date(review.reviewDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() =>
                  navigate(`/dashboard/update-reviews/${review._id}`)
                }
                className="flex-1 py-1 rounded bg-blue-500 text-white"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(review._id)}
                className="flex-1 py-1 rounded bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
