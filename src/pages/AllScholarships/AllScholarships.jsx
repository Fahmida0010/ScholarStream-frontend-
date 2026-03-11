import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      const url = `${import.meta.env.VITE_API_URL}/scholarships?search=${search}&category=${category}&subject=${subject}&location=${location}&sort=${sort}&page=${page}&limit=8`;
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
    if (e.key === "Enter") handleSearch();
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  if (loading || dataLoading) {
    return (
      <div className="w-[90%] mx-auto my-16">
        <div className="skeleton h-10 w-64 mx-auto mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="flex md:col-span-2 lg:col-span-2">
            <div className="skeleton h-12 flex-grow rounded-r-none"></div>
            <div className="skeleton h-12 w-28 rounded-l-none"></div>
          </div>
          <div className="skeleton h-12 rounded"></div>
          <div className="skeleton h-12 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="card bg-base-100 border border-base-300 shadow-xl p-4 rounded-2xl">
              <div className="skeleton h-40 w-full rounded-lg"></div>
              <div className="card-body p-4 space-y-3">
                <div className="skeleton h-6 w-full"></div>
                <div className="skeleton h-4 w-3/4"></div>
                <div className="skeleton h-4 w-1/2"></div>
                <div className="skeleton h-10 w-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto my-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-base-content">
        All Scholarships
      </h2>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="flex md:col-span-2 lg:col-span-2">
          <input
            type="text"
            placeholder="Search by scholarship, university or degree"
            className="input input-bordered flex-grow rounded-r-none bg-base-100 text-base-content focus:border-primary"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            className="btn bg-blue-400 rounded-l-none border-none"
          >
            🔍 Search
          </button>
        </div>

        <input
          type="text"
          placeholder="Subject Category"
          className="input input-bordered bg-base-100 text-base-content focus:border-primary"
          value={subjectInput}
          onChange={(e) => setSubjectInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <input
          type="text"
          placeholder="Country / City"
          className="input input-bordered bg-base-100 text-base-content focus:border-primary"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <select
          className="select select-bordered w-full md:w-60 bg-base-100 text-base-content"
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

        <select
          className="select select-bordered w-full md:w-60 bg-base-100 text-base-content"
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
        <div className="text-center py-20">
          <p className="text-base-content/50 text-xl font-medium">No scholarships found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {scholarships.map((sch) => (
            <div key={sch._id} className="card bg-base-100 shadow-xl border border-base-300 hover:border-primary/50 transition-all duration-300 group">
              <figure className="px-4 pt-4">
                <img
                  src={sch.image}
                  alt={sch.universityName}
                  className="h-44 w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
              </figure>

              <div className="card-body p-5 text-base-content">
                <h2 className="card-title text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                  {sch.scholarshipName}
                </h2>

                <div className="space-y-1.5 text-sm mt-2">
                  <p><span className="text-primary font-bold">University:</span> {sch.universityName}</p>
                  <p><span className="text-primary font-bold">Category:</span> {sch.scholarshipCategory}</p>
                  <p><span className="text-primary font-bold">Degree:</span> {sch.degree}</p>
                  <p><span className="text-primary font-bold">Location:</span> {sch.city}, {sch.country}</p>
                  <p className="text-lg font-bold mt-2">
                    <span className="text-primary">Fee:</span> ${sch.applicationFees}
                  </p>
                </div>

                <div className="card-actions mt-4">
                  <Link to={`/scholarships/${sch._id}`} className="w-full">
                    <Button className="btn-primary w-full">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`btn btn-sm md:btn-md ${num === page ? "btn bg-blue-500 shadow-lg shadow-primary/20" : "btn-outline border-base-300"}`}
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