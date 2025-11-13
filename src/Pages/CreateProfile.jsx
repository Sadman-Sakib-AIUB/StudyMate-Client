import React, { use, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxios from "../Hooks/useAxios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const CreateProfile = () => {
  const { user } = use(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const newProfile = {
      name: form.name.value,
      photoURL: form.profileimage.value,
      subject: form.subject.value,
      studyMode: form.studyMode.value,
      availability: form.availabilityTime.value,
      location: form.location.value,
      experienceLevel: form.experienceLevel.value,
      rating: parseFloat(form.rating.value) || 0,
      partnerCount: 0,
      email: user?.email,
    };

    try {
      const res = await axiosInstance.post("/partners", newProfile);
      if (res.data.insertedId) {
        toast.success("Profile created successfully!");
        form.reset();
        navigate("/findpartners");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create profile. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <Navbar></Navbar>
      <div className="py-10 bg-base-200 flex justify-center items-center">
        <ToastContainer />
        <div className="card w-full max-w-2xl shadow-lg bg-base-100 p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-primary">
            Create Study Partner Profile
          </h2>

          <form
            onSubmit={handleCreateProfile}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                required
                className="input input-bordered"
              />
            </div>

            {/* Profile Image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Profile Image URL
                </span>
              </label>
              <input
                type="text"
                name="profileimage"
                placeholder="Image URL"
                required
                className="input input-bordered"
              />
            </div>

            {/* Subject */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Subject</span>
              </label>
              <input
                type="text"
                name="subject"
                placeholder="e.g. English, Math, Programming"
                required
                className="input input-bordered"
              />
            </div>

            {/* Study Mode */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Study Mode</span>
              </label>
              <select
                name="studyMode"
                className="select select-bordered"
                required
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            {/* Availability Time */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Availability Time
                </span>
              </label>
              <input
                type="text"
                name="availabilityTime"
                placeholder="e.g. Evening 6–9 PM"
                required
                className="input input-bordered"
              />
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Location</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="City or area"
                required
                className="input input-bordered"
              />
            </div>

            {/* Experience Level */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Experience Level
                </span>
              </label>
              <select
                name="experienceLevel"
                className="select select-bordered"
                required
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            {/* Rating */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Rating</span>
              </label>
              <input
                type="number"
                step="0.1"
                name="rating"
                placeholder="0–5"
                className="input input-bordered"
              />
            </div>

            {/* Email */}
            <div className="form-control col-span-1 md:col-span-2">
              <label className="label">
                <span className="label-text font-semibold">
                  Email (Read Only)
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered bg-gray-100"
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-4 col-span-1 md:col-span-2">
              <button
                type="submit"
                className={`btn btn-primary text-white w-full ${
                  loading ? "loading" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CreateProfile;
