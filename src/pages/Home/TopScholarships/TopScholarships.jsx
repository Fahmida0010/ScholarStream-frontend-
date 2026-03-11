import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Shared/Button/Button";
import useAuth from "../../../hooks/useAuth";

const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const { loading: authLoading } = useAuth();
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    setDataLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/top-scholarships?limit=4`)
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data);
        setDataLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setDataLoading(false);
      });
  }, []);

  // Skeleton Loading (৪টি কার্ডের জন্য)
  if (authLoading || dataLoading) {
    return (
      <div className="w-[90%] mx-auto my-16">
        <div className="skeleton h-10 w-80 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="card bg-base-100 border border-base-300 shadow-xl p-4 rounded-2xl">
              <div className="skeleton h-40 w-full rounded-lg mb-4"></div>
              <div className="skeleton h-6 w-3/4 mb-3"></div>
              <div className="skeleton h-4 w-full mb-2"></div>
              <div className="skeleton h-4 w-2/3 mb-2"></div>
              <div className="skeleton h-10 w-full mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto my-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-base-content">
        Top Scholarships For You
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* slice(0, 4) নিশ্চিত করবে যেন কেবল ৪টি কার্ড রেন্ডার হয় */}
        {scholarships.slice(0, 4).map((sch) => (
          <div 
            key={sch._id} 
            className="card bg-base-100 border border-base-300 shadow-xl p-4 rounded-2xl hover:border-primary/50 transition-all duration-300 group"
          >
            <figure className="overflow-hidden rounded-lg">
              <img
                src={sch.image}
                alt={sch.universityName}
                className="h-40 w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </figure>

            <div className="card-body p-4 text-base-content">
              <h2 className="card-title text-xl font-bold line-clamp-1">{sch.scholarshipName}</h2>

              <div className="space-y-1 mt-2 text-sm">
                <p>
                  <strong className="text-primary">University:</strong> {sch.universityName}
                </p>
                <p>
                  <strong className="text-primary">Location:</strong> {sch.country}
                </p>
                <p>
                  <strong className="text-primary">Degree:</strong> {sch.degree}
                </p>
                <p>
                  <strong className="text-primary">Category:</strong> {sch.scholarshipCategory}
                </p>
                <p className="text-lg font-bold mt-2">
                   Fee: <span className="text-secondary">${sch.applicationFees}</span>
                </p>
              </div>

              <Link to={`/scholarships/${sch._id}`} className="mt-4">
                <Button className="w-full  text-primary-content border-none">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* View All Button (ঐচ্ছিক) */}
      <div className="text-center mt-12">
        <Link to="/all-scholarships">
           <button className="btn btn-outline bg-blue-400
            px-8">View All Scholarships</button>
        </Link>
      </div>
    </div>
  );
};

export default TopScholarships;