// import { useEffect, useState } from "react";
// import axios from "axios";
// import useAuth from "../../../hooks/useAuth";

// const MyReviews = () => {
//   const { user } = useAuth();
//   const [reviews, setReviews] = useState([]);
//   const [selectedReview, setSelectedReview] = useState(null);

//   const loadReviews = async () => {
//     const res = await axios.get(
//       `http://localhost:3000/reviews?email=${user.email}`
//     );
//     setReviews(res.data);
//   };

//   useEffect(() => {
//     if (user?.email) loadReviews();
//   }, [user]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     await axios.delete(`http://localhost:3000/reviews/${id}`);
//     loadReviews();
//   };

//   const handleUpdate = async () => {
//     await axios.put(
//       `http://localhost:3000/reviews/${selectedReview._id}`,
//       {
//         reviewComment: selectedReview.reviewComment,
//         ratingPoint: selectedReview.ratingPoint,
//       }
//     );
//     setSelectedReview(null);
//     loadReviews();
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

//       <table className="table w-full border">
//         <thead>
//           <tr>
//             <th>Scholarship Name</th>
//             <th>University</th>
//             <th>Comment</th>
//             <th>Rating</th>
//             <th>ReviewDate</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {reviews.map(review => (
//             <tr key={review._id}>
//               <td>{review.scholarshipId}</td>
//               <td>{review.universityName}</td>
//               <td>{review.reviewComment}</td>
//               <td>{review.ratingPoint}</td>
//               <td>{reviewDate(review.createdAt).toLocaleDateString()}</td>
//               <td>
//                 <button onClick={() => setSelectedReview(review)}>Edit</button>
//                 <button onClick={() => handleDelete(review._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Edit Modal */}
//       {selectedReview && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
//           <div className="bg-white p-6 rounded w-96">
//             <textarea
//               value={selectedReview.reviewComment}
//               onChange={(e) =>
//                 setSelectedReview({
//                   ...selectedReview,
//                   reviewComment: e.target.value,
//                 })
//               }
//               className="w-full border p-2"
//             />

//             <input
//               type="number"
//               min="1"
//               max="5"
//               value={selectedReview.ratingPoint}
//               onChange={(e) =>
//                 setSelectedReview({
//                   ...selectedReview,
//                   ratingPoint: Number(e.target.value),
//                 })
//               }
//               className="w-full border p-2 mt-2"
//             />

//             <div className="flex justify-end gap-2 mt-4">
//               <button onClick={handleUpdate}>Update</button>
//               <button onClick={() => setSelectedReview(null)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyReviews;


import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  const loadReviews = async () => {
    const res = await axios.get(
      `http://localhost:3000/reviews?email=${user.email}`
    );
    setReviews(res.data);
  };

  useEffect(() => {
    if (user?.email) {
      loadReviews();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`http://localhost:3000/reviews/${id}`);
    loadReviews();
  };

  const handleUpdate = async () => {
    await axios.put(
      `http://localhost:3000/reviews/${selectedReview._id}`,
      {
        reviewComment: selectedReview.reviewComment,
        ratingPoint: selectedReview.ratingPoint,
      }
    );
    setSelectedReview(null);
    loadReviews();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

      <table className="table w-full border">
        <thead>
          <tr>
            <th>Scholarship ID</th>
            <th>University</th>
            <th>Comment</th>
            <th>Rating</th>
            <th>Review Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map((review) => (
            <tr key={review._id || review.id}>
              <td>{review.scholarshipId}</td>
              <td>{review.universityName}</td>
              <td>{review.reviewComment}</td>
              <td>{review.ratingPoint}</td>
              <td>{new Date(review.reviewDate).toLocaleDateString()}</td>
              <td>
                  <button
                  onClick={() => Navigate(`/update-review/${review._id}`)}
                  className="btn btn-sm btn-info"
                >
                  Edit
                </button>
                {/* <button onClick={() => setSelectedReview(review)}>
                  Edit
                </button> */}
                <button onClick={() => handleDelete(review._id || review.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <textarea
              value={selectedReview.reviewComment}
              onChange={(e) =>
                setSelectedReview({
                  ...selectedReview,
                  reviewComment: e.target.value,
                })
              }
              className="w-full border p-2"
            />

            <input
              type="number"
              min="1"
              max="5"
              value={selectedReview.ratingPoint}
              onChange={(e) =>
                setSelectedReview({
                  ...selectedReview,
                  ratingPoint: Number(e.target.value),
                })
              }
              className="w-full border p-2 mt-2"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => setSelectedReview(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
