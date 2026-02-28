import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; 
import { format } from "date-fns";
import Button from "../../components/Shared/Button/Button";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [sch, setSch] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/scholarships/${id}`);
        const data = await res.json();
        setSch(data);
      } catch (err) {
        console.error("Failed to fetch scholarship:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScholarship();
  }, [id]);

  useEffect(() => {
    if (!sch?.universityName) return; 

    const fetchUniversityReviews = async () => {
      setLoadingReviews(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/reviews/university/${encodeURIComponent(sch.universityName)}`
        );
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch university reviews:", err);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchUniversityReviews();
  }, [sch?.universityName]); 

  if (isLoading) {
    return (
      <div className="w-[85%] mx-auto my-10">
        <div className="skeleton h-12 w-3/4 mx-auto mb-8 rounded"></div>
        <div className="skeleton h-8 w-1/2 mx-auto mb-10 rounded"></div>

        <div className="skeleton h-96 w-full rounded-lg mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton h-6 w-full rounded"></div>
          ))}
        </div>

        <div className="skeleton h-12 w-full md:w-1/2 mx-auto rounded mb-12"></div>

        <div className="mt-12">
          <div className="skeleton h-10 w-80 mb-8 rounded"></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-lg p-6 shadow-md bg-gray-200 mb-6">
              <div className="flex gap-5">
                <div className="skeleton h-16 w-16 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex justify-between mb-3">
                    <div className="skeleton h-6 w-1/3 rounded"></div>
                    <div className="skeleton h-5 w-24 rounded"></div>
                  </div>
                  <div className="skeleton h-5 w-3/4 rounded mb-2"></div>
                  <div className="skeleton h-5 w-full rounded mb-2"></div>
                  <div className="skeleton h-5 w-2/3 rounded mb-4"></div>
                  <div className="flex items-center">
                    <div className="skeleton h-8 w-32 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!sch) return null;

  return (
    <div className="w-[85%] mx-auto my-10">
      <h1 className="text-4xl font-bold mb-6">{sch.scholarshipName}</h1>
      <h3 className="text-2xl font-bold text-sky-600 mb-4">
        {sch.universityName}
      </h3>

      <img
        src={sch.image || "/placeholder-university.jpg"}
        alt={sch.universityName}
        className="w-full max-h-96 object-cover rounded-lg mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <p><strong className="text-green-500">University World Rank:</strong> {sch.worldRank}</p>
        <p><strong className="text-green-500">Location:</strong> {sch.country}</p>
        <p><strong className="text-green-500">Subject Category:</strong> {sch.subjectCategory}</p>
        <p><strong className="text-green-500">Deadline:</strong> {new Date(sch.deadline).toLocaleDateString()}</p>
        <p><strong className="text-green-500">Application Fees:</strong> ${sch.applicationFees}</p>
        <p><strong className="text-green-500">Description:</strong>{sch.description}</p>
        {sch.stipend && <p><strong className="text-green-500">Stipend:</strong> {sch.stipend}</p>}
      </div>

      <Link to={`/checkout/${sch._id}`}>
        <Button className="btn btn-secondary mt-5 w-full md:w-1/2">
          Apply for Scholarship
        </Button>
      </Link>

      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-purple-500 mb-6">
          All Reviews for {sch.universityName} ({reviews.length})
        </h2>

        {loadingReviews ? (
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-lg p-6 shadow-md bg-gray-200 mb-6">
                <div className="flex gap-5">
                  <div className="skeleton h-16 w-16 rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-3">
                      <div className="skeleton h-6 w-1/3 rounded"></div>
                      <div className="skeleton h-5 w-24 rounded"></div>
                    </div>
                    <div className="skeleton h-5 w-3/4 rounded mb-2"></div>
                    <div className="skeleton h-5 w-full rounded mb-2"></div>
                    <div className="skeleton h-5 w-2/3 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-xl">No reviews yet for this university.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="rounded-lg p-6 shadow-md bg-gray-200 flex gap-5 hover:shadow-lg transition"
              >
                <img
                  src={review.userImage || "/default-user.png"}
                  alt={review.userName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-green-500">{review.userName}</h3>
                      <p className="font-bold">{review.userEmail}</p>
                      <p className="text-lg font-bold text-blue-600">
                        {review.scholarshipName}
                      </p>
                      <p className="text-pink-700 font-semibold leading-relaxed">
                        {review.reviewComment}
                      </p>
                    </div>
                    <span className="text-bold text-red-500">
                      {review.createdAt ? format(new Date(review.createdAt), "dd/MM/yyyy") : "-"}
                    </span>
                  </div>

                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500 text-3xl">
                      {"★".repeat(review.ratingPoint)}
                    </span>
                    <span className="text-yellow-500 text-xl">
                      {"☆".repeat(5 - review.ratingPoint)}
                    </span>
                    <span className="ml-2 text-sm text-gray-600">
                      {review.ratingPoint}/5
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetails;