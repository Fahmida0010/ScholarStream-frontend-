import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";

const ScholarshipDetails = () => {
  const { id } = useParams();

  const [sch, setSch] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    // Fetch scholarship details
    fetch(`${import.meta.env.VITE_API_URL}/scholarships/${id}`)
      .then((res) => res.json())
      .then((data) => setSch(data));

    // Fetch reviews for this scholarship
    fetch(`${import.meta.env.VITE_API_URL}/scholarships/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoadingReviews(false);
      })
      .catch(() => setLoadingReviews(false));
  }, [id]);

  if (!sch) return <LoadingSpinner />;

  return (
    <div className="w-[85%] mx-auto my-10">
      {/* Scholarship Details */}
      <h1 className="text-4xl font-bold mb-6">{sch.scholarshipName}</h1>

      <img
        src={sch.image}
        alt="Scholarship"
        className="w-full max-h-96 object-cover rounded-lg mb-6"
      />

      <p>
        <strong>University World Rank:</strong> {sch.worldRank}
      </p>
      <p>
        <strong>Location:</strong>{sch.country}
      </p>
        <p>
        <strong>Subject Category:</strong> {sch.subjectCategory}
      </p>
      <p>
        <strong>Deadline:</strong> {sch.deadline}
      </p>
      <p>
        <strong>Application Fees:</strong> ${sch.applicationFees}
      </p>
      {sch.stipend && (
        <p>
          <strong>Stipend / Coverage:</strong> {sch.stipend}
        </p>
      )}

      {/* Apply Button */}
      <Link to={`/checkout/${sch._id}`}>
        <button className="btn btn-secondary mt-5 w-1/2">
          Apply for Scholarship
        </button>
      </Link>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-semibold mb-4">Reviews</h2>

        {loadingReviews ? (
          <LoadingSpinner />
        ) : reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet for this scholarship.</p>
        ) : (
          reviews.map((reviews) => (
            <div
              key={reviews._id}
              className="border rounded-lg p-4 mb-4 shadow-sm flex gap-4"
            >
              <img
                src={reviews.userImage || "/default-user.png"}
                alt={reviews.userName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold">{reviews.userName}</h3>
                  <span className="text-gray-400 text-sm">
                    {new Date(reviews.reviewDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-yellow-500 mb-1">
                  {"★".repeat(reviews.ratingPoint)}{" "}
                  <span className="text-gray-400">
                    {"☆".repeat(5 - reviews.ratingPoint)}
                  </span>
                </p>
                <p>{reviews.reviewComment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetails;