
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Button from "../../../components/Shared/Button/Button";

 
const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/top-scholarships")
      .then((res) => res.json())
      .then((data) => {
        // Sort by post date (newest first)
        const sorted = data.sort(
          (a, b) => new Date(b.scholarshipPostDate) - new Date(a.scholarshipPostDate)
        );

        setScholarships(sorted.slice(0, 6));
      })
      .catch((err) => console.log(err));
  }, []);

 //if(loading) return <LoadingSpinner/>

  return (
    <div className="w-[90%] mx-auto my-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        Top Scholarships for You
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scholarships.map((sch) => (
          <div key={sch._id} className="card bg-base-100 shadow-xl bg-blue-100 p-4">

            <figure>
              <img
                src={sch.universityImage}
                alt={sch.universityName}
                className="h-40 w-full object-cover rounded-lg"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{sch.scholarshipName}</h2>
              <p><strong className="text-blue-600">University:</strong> {sch.universityName}</p>
              <p><strong className="text-blue-600">Country:</strong> {sch.universityCountry}</p>
              <p><strong className="text-blue-600">Degree:</strong> {sch.degree}</p>
              <p><strong className="text-blue-600">Category:</strong> {sch.scholarshipCategory}</p>
              <p><strong className="text-blue-600">Application Fee:</strong> ${sch.applicationFees}</p>

              <Link to={`/scholarships/${sch._id}`}>
                <Button
               className="bg-purple-500">
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
