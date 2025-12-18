import { useEffect, useState } from "react";
import { Link } from "react-router";
import Button from "../../../components/Shared/Button/Button";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";

const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
 const {loading} = useAuth()
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/top-scholarships`)
      .then((res) => res.json())
      .then((data) => {
        // newest first (postDate অনুযায়ী
        const sorted = data.sort(
          (a, b) => new Date(b.postDate) - new Date(a.postDate)
        );
        setScholarships(sorted.slice(0, 6));
      })
      .catch((err) => console.error(err));  
  }, []);        
  if (loading) return <LoadingSpinner/>
     
  return (
    <div className="w-[90%] mx-auto my-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Top Scholarships for You
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scholarships.map((sch) => (
          <div
            key={sch._id}
            className="card bg-blue-100 shadow-xl p-4"
          >
            <figure>
              <img
                src={sch.image}
                alt={sch.universityName}
                className="h-40 w-full object-cover rounded-lg"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {sch.scholarshipName}
              </h2>

              <p>
                <strong>University:</strong>{" "}
                {sch.universityName}
              </p>

              <p>
                <strong>Country:</strong> {sch.country}
              </p>

              <p>
                <strong>Degree:</strong> {sch.degree}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {sch.scholarshipCategory}
              </p>

              <p>
                <strong>Application Fee:</strong> $
                {sch.applicationFees}
              </p>

              <Link to={`/scholarships/${sch._id}`}>
                <Button className="w-full mt-3 bg-purple-500">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopScholarships;
