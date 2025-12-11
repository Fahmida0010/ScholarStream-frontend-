// import { useEffect, useState } from "react";
// import { Link } from "react-router";

// const AllScholarships = () => {
//   const [scholarships, setScholarships] = useState([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [subject, setSubject] = useState("");
//   const [location, setLocation] = useState("");
    


//   const fetchScholarships = () => {
//     let url = `http://localhost:3000/scholarships?search=${search}&category=${category}&subject=${subject}&location=${location}`;
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => setScholarships(data))
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     fetchScholarships();
//   }, [search, category, subject, location]);

//   return (
//     <div className="w-[90%] mx-auto my-16">
//       <h2 className="text-3xl font-bold text-center mb-10">All Scholarships</h2>

//       {/* Search & Filters */}
//       <div className="flex flex-col md:flex-row gap-4 mb-8">
//         <input
//           type="text"
//           placeholder="Search by name, university, or degree"
//           className="input input-bordered flex-grow"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select className="select select-bordered" value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="">All Categories</option>
//           <option value="Full Fund">Full Fund</option>
//           <option value="Partial">Partial</option>
//           <option value="Self-Fund">Self-Fund</option>
//         </select>
//         <input
//           type="text"
//           placeholder="Subject Category"
//           className="input input-bordered"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Location"
//           className="input input-bordered"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         />
//       </div>



//       {/* Scholarships Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {scholarships.map((sch) => (
//           <div key={sch._id} className="card bg-base-100 shadow-xl border p-4">
//             <figure>
//               <img src={sch.universityImage} alt={sch.universityName} className="h-40 w-full object-cover rounded-lg" />
//             </figure>
//             <div className="card-body">
//               <h2 className="card-title">{sch.universityName}</h2>
//               <p><strong>Category:</strong> {sch.scholarshipCategory}</p>
//               <p><strong>Location:</strong> {sch.universityCountry}</p>
//               <p><strong>Application Fee:</strong> ${sch.applicationFees}</p>
//               <Link to={`/scholarships/${sch._id}`}>
//                 <button className="btn btn-primary w-full mt-3">View Details</button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllScholarships;


import { useEffect, useState } from "react";
import { Link } from "react-router";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/useAuth";


const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const {loading} = useAuth()
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState(""); // new state for sort
  const [page, setPage] = useState(1); // current page
  const [totalPages, setTotalPages] = useState(1); // total pages
  

  const fetchScholarships = () => {
    let url = `http://localhost:3000/scholarships?search=${search}&category=${category}&subject=${subject}&location=${location}&sort=${sort}&page=${page}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data.scholarships);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchScholarships();
  }, [search, category, subject, location, sort, page]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1); // reset to first page when sort changes
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

   
   if(loading) return <LoadingSpinner/>
  return (
    <div className="w-[90%] mx-auto my-16">
      <h2 className="text-3xl font-bold text-center mb-10">All Scholarships</h2>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, university, or degree"
          className="input input-bordered flex-grow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="select select-bordered" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Full Fund">Full Fund</option>
          <option value="Partial">Partial</option>
          <option value="Self-Fund">Self-Fund</option>
        </select>
        <input
          type="text"
          placeholder="Subject Category"
          className="input input-bordered"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="input input-bordered"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Sort */}
      <div className="flex justify-end mb-4">
        <select className="select select-bordered 
        w-60" value={sort} onChange={handleSortChange}>
          <option value="fee_desc">High to Low</option>
          <option value="fee_asc">Low to High</option>
        </select>
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(scholarships || []).map((sch) => (
          <div key={sch._id} className="card bg-base-100 shadow-xl border p-4">
            <figure>
              <img src={sch.universityImage} alt={sch.universityName} className="h-40 w-full object-cover rounded-lg" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{sch.universityName}</h2>
              <p><strong>Category:</strong> {sch.scholarshipCategory}</p>
              <p><strong>Location:</strong> {sch.universityCountry}</p>
              <p><strong>Application Fee:</strong> ${sch.applicationFees}</p>
              <Link to={`/scholarships/${sch._id}`}>
                <button className="btn btn-primary w-full mt-3">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
<div className="flex justify-center mt-8 gap-2">
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
    <button
      key={num}
      className={`btn ${num === page ? "btn-primary" : "btn-outline"}`}
      onClick={() => handlePageChange(num)}
    >
      {num}
    </button>
  ))}
</div>

    </div>
  );
};

export default AllScholarships;
