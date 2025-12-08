import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Reviews from "../Reviews/Reviews";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [sch, setSch] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    userName: "",
    userImage: "",
    ratingPoint: 5,
    reviewComment: ""
  });

  const handleReviewSubmit = (e, scholarshipId) => {
  e.preventDefault();

  const reviewWithId = {
    ...newReview,
    scholarshipId: scholarshipId, 
    reviewDate: new Date()
  };

  fetch("http://localhost:3000/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewWithId)
  })
    .then(res => res.json())
    .then(data => {
      setReviews(prev => [reviewToSend, ...prev]); // instant update on UI
      setNewReview({ userName: "", userImage: "", ratingPoint: 1, reviewComment: "" });
    });
};


  // Fetch Scholarship Details & Reviews
  useEffect(() => {
    // Scholarship Details
    fetch(`http://localhost:3000/scholarships/${id}`)
      .then(res => res.json())
      .then(data => setSch(data));

    // Reviews for this scholarship only
    fetch(`http://localhost:3000/scholarships/${id}/reviews`)
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [id]);

  if (!sch) return <p className="text-center my-20">Loading...</p>;

  return (
    <div className="w-[85%] mx-auto my-10">
      <h1 className="text-4xl font-bold mb-6">{sch.scholarshipName}</h1>

      <img
        src={sch.universityImage}
        className="w-full max-h-96 object-cover rounded-lg mb-6"
        alt=""
      />

      <p><strong>University World Rank:</strong> {sch.universityWorldRank}</p>
      <p><strong>Location:</strong> {sch.universityCity}, {sch.universityCountry}</p>
      <p><strong>Deadline:</strong> {sch.applicationDeadline}</p>
      <p><strong>Application Fees:</strong> ${sch.applicationFees}</p>
      <p><strong>Description:</strong> {sch.description}</p>
      <p><strong>Stipend / Coverage:</strong> {sch.stipend}</p>

      {/* Apply Button */}
      <a href={`/checkout/${sch._id}`}>
        <button className="btn btn-secondary mt-4 w-full">Apply for Scholarship</button>
      </a>

      {/* Reviews Section */}
      <Reviews
        reviews={reviews}
        newReview={newReview}
        setNewReview={setNewReview}
        handleReviewSubmit={handleReviewSubmit}
        scholarshipId={sch._id} 
      />
    </div>
  );
};

export default ScholarshipDetails;
