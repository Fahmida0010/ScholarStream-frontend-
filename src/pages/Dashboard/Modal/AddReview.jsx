// import { useState } from "react"; 
// import Swal from "sweetalert2";
// import axios from "axios";
// import Button from "../../../components/Shared/Button/Button";

// const API = "http://localhost:3000"; // backend base URL

// const AddReview = () => {
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");

//   const handleSubmit = async () => {
//     if (!rating || !comment) {
//       Swal.fire("Error", "Please fill all fields", "error");
//       return;
//     }


//     try {
//       const res = await axios.post(`${API}/reviews`, {
//         applicationId,
//         userEmail,
//         scholarshipName,
//         universityName,
//         ratingPoint: rating,
//         reviewComment: comment,
//       });

//       if (res.data.insertedId) {
//         Swal.fire("Success!", "Review added successfully!", "success");

//         if (reloadReviews) reloadReviews(); // 🔥 MyReviews reload
//         if (onClose) onClose();             // 🔥 close modal
//       }
//     } catch (err) {
//       console.log(err);
//       Swal.fire("Error!", "Failed to add review", "error");
//     }
//   };

//   return (
//     <div className=" flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
//         <h2 className="text-xl font-bold mb-4 text-center">Add Review</h2>

//         <label className="block mb-2 font-medium">Rating (1-5 ⭐)</label>
//         <select
//           value={rating}
//           onChange={(e) => setRating(Number(e.target.value))}
//           className="w-full p-2 border rounded mb-4"
//         >
//           <option value="1">1 ⭐</option>
//           <option value="2">2 ⭐⭐</option>
//           <option value="3">3 ⭐⭐⭐</option>
//           <option value="4">4 ⭐⭐⭐⭐</option>
//           <option value="5">5 ⭐⭐⭐⭐⭐</option>
//         </select>

//         <label className="block mb-2 font-medium">Comment</label>
//         <textarea
//           rows="4"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           className="w-full p-2 border rounded mb-4"
//           placeholder="Write your feedback..."
//         ></textarea>

//         <div className="flex justify-between">
//           <Button
//          //   onClick={onClose}
//             className="px-4 py-2 bg-red-500 rounded"
//           >
//             Cancel
//           </Button>

//           <Button
//             onClick={handleSubmit}
//             className=""
//           >
//             Submit
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddReview;

import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Button from "../../../components/Shared/Button/Button";
import useAuth from "../../../hooks/useAuth";

const API = "http://localhost:3000";

const AddReview = ({
  applicationId,
  scholarshipName,
  universityName,
  onClose,
  reloadReviews,
}) => {
  const { user } = useAuth();

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
        scholarshipName,
        universityName,
        userEmail: user.email,
        ratingPoint: rating,
        reviewComment: comment,
      });

      if (res.data.insertedId) {
        Swal.fire("Success!", "Review added successfully!", "success");
        reloadReviews && reloadReviews();
        onClose && onClose();
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error!", "Failed to add review", "error");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Add Review</h2>

        <label className="block mb-2">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border p-2 mb-4"
        >
          {[1,2,3,4,5].map(n => (
            <option key={n} value={n}>{n} ⭐</option>
          ))}
        </select>

        <textarea
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border p-2 mb-4"
          placeholder="Write your feedback..."
        />

        <div className="flex justify-between">
          <Button onClick={onClose} className="bg-red-500">
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
