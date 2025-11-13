import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxios from "../Hooks/useAxios";
import { toast } from "react-toastify";

const TopPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axiosInstance.get("/partners");
        // Sort by rating descending and take top 3
        const topPartners = res.data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        setPartners(topPartners);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch partners!");
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, [axiosInstance]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <button className="btn btn-primary loading">Loading</button>
      </div>
    );
  }

  return (
    <div className="py-10 bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-8">Top Study Partners</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-10">
        {partners.map((partner) => (
          <div
            key={partner._id}
            className="card bg-base-200 shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
          >
            <img
              src={partner.photoURL}
              alt={partner.name}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{partner.subject}</p>
            <p className="text-sm text-gray-600 mb-2">{partner.experienceLevel}</p>
            <p className="text-yellow-500 font-semibold mb-3">
              ⭐ {partner.rating.toFixed(1)}
            </p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate(`/partner/${partner._id}`)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPartners;
