import React from 'react';
import { FaBook, FaLaptop, FaFlask, FaUserFriends, FaFootballBall, FaGlobe, FaBed, FaUtensils, FaCheck, FaTimes } from 'react-icons/fa';

const allAmenities = [
  { title: 'Library Access', icon: <FaBook /> },
  { title: 'Computer Labs', icon: <FaLaptop /> },
  { title: 'Lab Facilities', icon: <FaFlask /> },
  { title: 'Student Clubs', icon: <FaUserFriends /> },
  { title: 'Sports Events', icon: <FaFootballBall /> },
  { title: 'International Programs', icon: <FaGlobe /> },
  { title: 'Free Dormitory', icon: <FaBed /> },
  { title: 'Free Meals', icon: <FaUtensils /> },
];

const scholarshipData = {
  standard: {
    type: '50% Scholarship',
    badge: 'Standard',
    benefits: ['Library Access', 'Computer Labs', 'Lab Facilities', 'Student Clubs', 'Sports Events'],
  },
  premium: {
    type: '100% Scholarship',
    badge: 'Premium',
    benefits: ['Library Access', 'Computer Labs', 'Lab Facilities', 'Student Clubs', 'Sports Events', 'International Programs', 'Free Dormitory', 'Free Meals'],
  }
};

const ScholarshipAmenities = () => {
  return (
    <section className="py-20 bg-base-200 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight text-base-content mb-4">
            Scholarship <span className="text-primary">Amenities</span>
          </h2>
          <p className="text-base-content/60 max-w-lg mx-auto italic">
            Compare benefits side-by-side to find the right fit for your future.
          </p>
        </div>

        {/* Comparison Card */}
        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full table-zebra">
              {/* Table Header */}
              <thead>
                <tr className="bg-base-300/50 text-base-content">
                  <th className="py-6 text-lg">Facilities</th>
                  <th className="py-6 text-center text-lg">{scholarshipData.standard.type}</th>
                  <th className="py-6 text-center text-lg text-primary">{scholarshipData.premium.type}</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="text-base-content">
                {allAmenities.map((amenity, index) => {
                  const hasStandard = scholarshipData.standard.benefits.includes(amenity.title);
                  const hasPremium = scholarshipData.premium.benefits.includes(amenity.title);

                  return (
                    <tr key={index} className="hover:bg-base-200/50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="p-2 rounded-lg bg-primary/10 text-primary">
                            {amenity.icon}
                          </span>
                          <span className="font-bold">{amenity.title}</span>
                        </div>
                      </td>
                      
                      {/* Standard Column */}
                      <td className="text-center">
                        {hasStandard ? (
                          <FaCheck className="mx-auto text-success" size={20} />
                        ) : (
                          <FaTimes className="mx-auto text-error opacity-30" size={20} />
                        )}
                      </td>

                      {/* Premium Column */}
                      <td className="text-center bg-primary/5">
                        {hasPremium ? (
                          <FaCheck className="mx-auto text-primary" size={22} />
                        ) : (
                          <FaTimes className="mx-auto text-error" size={22} />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Footer Promo */}
          <div className="p-6 bg-pink-500 text-primary-content text-center font-bold">
            Apply now to secure your 100% Premium Scholarship benefits!
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipAmenities;