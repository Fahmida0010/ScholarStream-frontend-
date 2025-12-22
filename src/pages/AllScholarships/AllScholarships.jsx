import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/Shared/Button/Button";

const AllScholarships = () => {
  const { loading } = useAuth();

  const [scholarships, setScholarships] = useState([]);
  
  const [searchInput, setSearchInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [locationInput, setLocationInput] = useState("");

  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLoading, setDataLoading] = useState(true);

  const fetchScholarships = async () => {
    setDataLoading(true);
    try {
      const url = `${import.meta.env.VITE_API_URL}/scholarships?search=${search}&category=${category}&subject=${subject}&location=${location}&sort=${sort}&page=${page}`;

      const res = await fetch(url);
      const data = await res.json();

      setScholarships(data.scholarships || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, [search, category, subject, location, sort, page]);

  const handleSearch = () => {
    setSearch(searchInput.trim());
    setSubject(subjectInput.trim());
    setLocation(locationInput.trim());
    setPage(1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  if (loading || dataLoading) return <LoadingSpinner />;

  return (
    <div className="w-[90%] mx-auto my-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        All Scholarships
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Main Search Bar with Button */}
        <div className="flex md:col-span-2 lg:col-span-2">
          <input
            type="text"
            placeholder="Search by scholarship, university or degree"
            className="input input-bordered flex-grow rounded-r-none"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            className="btn btn-primary rounded-l-none"
          >
            🔍 Search
          </button>
        </div>

        {/* Subject Category */}
        <input
          type="text"
          placeholder="Subject Category"
          className="input input-bordered"
          value={subjectInput}
          onChange={(e) => setSubjectInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        {/* Country / City */}
        <input
          type="text"
          placeholder="Country / City"
          className="input input-bordered"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        {/* Category Dropdown - Desktop এ ৪র্থ কলামে, Mobile এ নিচে যাবে */}
        <select
          className="select select-bordered md:col-span-2 lg:col-span-1"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          <option value="Full Fund">Full Fund</option>
          <option value="Partial">Partial</option>
        </select>
      </div>

      {/* Sort */}
      <div className="flex justify-end mb-6">
        <select
          className="select select-bordered w-60"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="">Sort by Application Fee</option>
          <option value="fee_desc">High to Low</option>
          <option value="fee_asc">Low to High</option>
        </select>
      </div>

      {/* Scholarships Grid */}
      {scholarships.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">
          No scholarships found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map((sch) => (
            <div key={sch._id} className="card bg-blue-100 shadow-xl p-4">
              <figure>
                <img
                  src={sch.image}
                  alt={sch.universityName}
                  className="h-40 w-full object-cover rounded-lg"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">{sch.scholarshipName}</h2>

                <p>
                  <strong className="text-blue-500">University:</strong>{" "}
                  {sch.universityName}
                </p>

                <p>
                  <strong className="text-blue-500">Category:</strong>{" "}
                  {sch.scholarshipCategory}
                </p>

                <p>
                  <strong className="text-blue-500">Degree:</strong> {sch.degree}
                </p>

                <p>
                  <strong className="text-blue-500">Location:</strong>{" "}
                  {sch.city}, {sch.country}
                </p>

                <p>
                  <strong className="text-blue-500">Application Fee:</strong> $
                  {sch.applicationFees}
                </p>

                <Link to={`/scholarships/${sch._id}`}>
                  <Button className="w-full mt-3">View Details</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`btn ${num === page ? "btn-primary" : "btn-outline"}`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllScholarships;