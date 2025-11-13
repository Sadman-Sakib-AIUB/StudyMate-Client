import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAxios from "../Hooks/useAxios";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const FindPartners = () => {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // default: high rating first
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axiosInstance.get("/partners");
        setPartners(res.data);
        setFilteredPartners(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch partners!");
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, [axiosInstance]);

  // Search filter
  useEffect(() => {
    const filtered = partners.filter(
      (partner) =>
        partner.name.toLowerCase().includes(search.toLowerCase()) ||
        partner.subject.toLowerCase().includes(search.toLowerCase()) ||
        partner.institute.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPartners(filtered);
  }, [search, partners]);

  // Sort by rating
  const handleSort = () => {
    const sorted = [...filteredPartners].sort((a, b) =>
      sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating
    );
    setFilteredPartners(sorted);
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <button className="btn btn-primary loading">Loading</button>
      </div>
    );
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="py-10 bg-base-100">
        <h2 className="text-3xl font-bold text-center mb-8">
          Find Study Partners
        </h2>

        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 px-4 md:px-10 gap-4">
          <input
            type="text"
            placeholder="Search by name, subject, or institute..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full md:w-1/2"
          />
          <button className="btn btn-outline btn-primary" onClick={handleSort}>
            Sort by Rating {sortOrder === "desc" ? "↓" : "↑"}
          </button>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-10">
          {filteredPartners.length > 0 ? (
            filteredPartners.map((partner) => (
              <div
                key={partner._id}
                className="card bg-base-200 shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
              >
                <img
                  src={partner.photoURL}
                  alt={partner.name}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">{partner.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{partner.subject}</p>
                <p className="text-sm text-gray-600 mb-1">
                  {partner.experienceLevel}
                </p>
                <p className="text-yellow-500 font-semibold mb-3">
                  ⭐ {partner.rating.toFixed(1)}
                </p>
                <Link
                  className="btn btn-primary btn-sm"
                  to={`/partner/${partner._id}`}
                >
                  View Profile
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No partners found.
            </p>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default FindPartners;
