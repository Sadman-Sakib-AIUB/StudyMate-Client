import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import useAxios from "../Hooks/useAxios";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../Providers/AuthProvider";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const PartnerDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.info("Please login to view partner details.");
      navigate("/login");
      return;
    }

    const fetchPartner = async () => {
      try {
        const res = await axiosInstance.get(`/partners/${id}`);
        console.log(res);
        setPartner(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch partner data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, [id, user, navigate, axiosInstance]);

  const handleSendRequest = async () => {
    try {
      if (!user) {
        toast.error("You must be logged in to send a request.");
        navigate("/login");
        return;
      }

      // Increase partnerCount
      await axiosInstance.patch(`/partners/${id}`, {
        partnerCount: partner.partnerCount + 1,
      });

      // Add to connections collection
      const connectionData = {
        partnerId: partner._id,
        partnerName: partner.name,
        partnerEmail: partner.email,
        partnerPhoto: partner.photoURL,
        userEmail: user.email,
        sentAt: new Date(),
      };
      await axiosInstance.post("/connections", connectionData);

      toast.success("Partner request sent successfully!");
      setPartner({ ...partner, partnerCount: partner.partnerCount + 1 });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send partner request.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <button className="btn btn-primary loading">Loading</button>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-500">Partner not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="py-10 px-4 md:px-20 bg-base-100">
        <ToastContainer></ToastContainer>
        <div className="max-w-4xl mx-auto bg-base-200 shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">
          <img
            src={partner.photoURL}
            alt={partner.name}
            className="w-48 h-48 rounded-full object-cover mx-auto md:mx-0"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{partner.name}</h2>
            <p className="text-gray-600 mb-1">
              <strong>Subject:</strong> {partner.subject}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Study Mode:</strong> {partner.studyMode}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Experience Level:</strong> {partner.experienceLevel}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Availability:</strong> {partner.availability}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Location:</strong> {partner.location || "N/A"}
            </p>
            <p className="text-yellow-500 font-semibold mb-3">
              ⭐ {partner.rating.toFixed(1)}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Connections:</strong> {partner.partnerCount}
            </p>
            <button
              onClick={handleSendRequest}
              className="btn btn-primary text-white"
            >
              Send Partner Request
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PartnerDetails;
