import React from "react";
import Button from "../../components/Shared/Button/Button";

const Reviews = ({
  reviews,
  scholarshipId, 
  newReview,
  setNewReview,
  handleReviewSubmit
}) => {
  return (
    <div className="mt-10">
      {/* Reviews Section */}
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>

      {/* {reviews.length === 0 && <p>No reviews yet for this scholarship.</p>} */}

      {reviews.map((rev) => (
        <div key={rev.id || rev._id} className="border border-pink-400 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-4 mb-2">
            <img
              src={rev.userImage}
              className="w-10 h-10 rounded-full"
              alt={rev.userName}
            />
            <div>
              <p className="font-bold">{rev.userName}</p>
              <p className="text-sm text-gray-500">
                {new Date(rev.reviewDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <p>
            <strong>Rating:</strong> {rev.ratingPoint}/5
          </p>
          <p>{rev.reviewComment}</p>
        </div>
      ))}

      {/* Add Review Form */}
      <form
        onSubmit={(e) => handleReviewSubmit(e, scholarshipId)}
        className="mt-6 border-2 border-pink-600 p-4 rounded-lg"
      >
        <h3 className="font-bold mb-2">Add Your Review</h3>

        <input
          type="text"
          placeholder="Your Name"
          className="input input-bordered w-full mb-2"
          value={newReview.userName}
          onChange={(e) =>
            setNewReview({ ...newReview, userName: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Your Image URL"
          className="input input-bordered w-full mb-2"
          value={newReview.userImage}
          onChange={(e) =>
            setNewReview({ ...newReview, userImage: e.target.value })
          }
        />

        <input
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          className="input input-bordered w-full mb-2"
          value={newReview.ratingPoint}
          onChange={(e) =>
            setNewReview({
              ...newReview,
              ratingPoint: Number(e.target.value)
            })
          }
          required
        />

        <textarea
          placeholder="Your Comment"
          className="textarea textarea-bordered w-full mb-2"
          value={newReview.reviewComment}
          onChange={(e) =>
            setNewReview({ ...newReview, reviewComment: e.target.value })
          }
          required
        ></textarea>

        <Button type="submit" className="btn btn-primary w-full">
          Submit Review
        </Button>
      </form>
    </div>
  );
};

export default Reviews;
