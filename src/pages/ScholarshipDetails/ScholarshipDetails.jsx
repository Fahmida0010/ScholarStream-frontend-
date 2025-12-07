import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [sch, setSch] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/scholarship/${id}`)
      .then((res) => res.json())
      .then((data) => setSch(data));

    fetch(`http://localhost:5000/scholarship/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
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
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((rev) => (
          <div key={rev._id} className="border p-4 rounded-lg mb-4">
            <div className="flex items-center gap-4 mb-2">
              <img src={rev.reviewerImage} className="w-10 h-10 rounded-full" alt={rev.reviewerName} />
              <div>
                <p className="font-bold">{rev.reviewerName}</p>
                <p className="text-sm text-gray-500">{new Date(rev.date).toLocaleDateString()}</p>
              </div>
            </div>
            <p><strong>Rating:</strong> {rev.rating}/5</p>
            <p>{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipDetails;
