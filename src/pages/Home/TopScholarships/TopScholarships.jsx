import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Shared/Button/Button";
import useAuth from "../../../hooks/useAuth";

const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const { loading } = useAuth();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/top-scholarships`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.postDate) - new Date(a.postDate)
        );
        setScholarships(sorted.slice(0, 8)); // এখন 8 card দেখাবে
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <div className="w-[90%] mx-auto my-16">
        <div className="skeleton h-10 w-80 mx-auto mb-12 rounded"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl p-4 rounded-2xl"
            >
              <div className="skeleton h-40 w-full rounded-lg mb-4"></div>
              <div className="card-body p-0">
                <div className="skeleton h-7 w-4/5 rounded mb-3"></div>
                <div className="skeleton h-5 w-3/4 rounded mb-2"></div>
                <div className="skeleton h-5 w-2/3 rounded mb-2"></div>
                <div className="skeleton h-5 w-full rounded mb-2"></div>
                <div className="skeleton h-5 w-1/2 rounded mb-4"></div>
                <div className="skeleton h-10 w-full rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto my-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Top Scholarships for You
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {scholarships.map((sch) => (
          <div
            key={sch._id}
            className="card bg-blue-100 shadow-xl p-4 rounded-2xl"
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
                <strong>Location:</strong> {sch.country}
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