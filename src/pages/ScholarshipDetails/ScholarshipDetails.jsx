import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; 
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import { format } from "date-fns";
import Button from "../../components/Shared/Button/Button";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [sch, setSch] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/scholarships/${id}`);
        const data = await res.json();
        setSch(data);
      } catch (err) {
        console.error("Failed to fetch scholarship:", err);
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

  if (!sch) return <LoadingSpinner />;

  return (
    <div className="w-[85%] mx-auto my-10">
      {/* Scholarship Details */}
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

      {/* Reviews Section - All reviews for this University */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-purple-500 mb-6">
          All Reviews for {sch.universityName} ({reviews.length})
        </h2>

        {loadingReviews ? (
          <LoadingSpinner />
        ) : reviews.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-xl">No reviews yet for this university.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="rounded-lg p-6 shadow-md bg-gray-200
                 flex gap-5 hover:shadow-lg transition"
              >
                <img
                  src={review.userImage || "/default-user.png"}
                  alt={review.userName}
         className="w-16 h-16 rounded-full object-cover border-2
          border-gray-200"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-green-500">{review.userName}</h3>
         <p className="font-bold ">{review.userEmail}</p>
               <p className="text-lg font-bold text-blue-600">
                    {review.scholarshipName}
                      </p>
          <p className="text-pink-700 font-semibold leading-relaxed">
                    {review.reviewComment}
                  </p>
                    </div>
                    <span className="text-bold text-red-500">
                        {review.createdAt? format(new Date(review.createdAt), "dd/MM/yyyy") : "-"}
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

