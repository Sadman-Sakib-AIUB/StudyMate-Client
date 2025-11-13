import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxios from "../Hooks/useAxios";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Profile = () => {
  const { user, updateUser } = use(AuthContext);
  const axiosInstance = useAxios();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
  });

  // Load user data from MongoDB
  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/users/${user.email}`)
        .then((res) => {
          setUserData(res.data);
          setFormData({
            name: res.data.name,
            photoURL: res.data.photoURL,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user, axiosInstance]);

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Update Firebase profile
      await updateUser({
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      // Update MongoDB record
      const res = await axiosInstance.patch(`/users/${user.email}`, formData);

      if (res.data.modifiedCount > 0) {
        toast.success("Profile updated successfully!");
        setUserData({ ...userData, ...formData });
        setEditing(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-md mx-auto bg-base-100 shadow-lg rounded-lg p-6 mt-10 mb-10">
        <ToastContainer />
        <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>

        <div className="flex flex-col items-center gap-3">
          <img
            src={userData?.photoURL}
            alt={userData?.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-primary"
          />
          <h3 className="text-xl font-semibold">{userData?.name}</h3>
          <p className="text-gray-500">{userData?.email}</p>
        </div>

        <div className="divider my-4"></div>

        {!editing ? (
          <div className="text-center">
            <button
              onClick={() => setEditing(true)}
              className="btn btn-primary text-white"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Photo URL</span>
              </label>
              <input
                type="text"
                value={formData.photoURL}
                onChange={(e) =>
                  setFormData({ ...formData, photoURL: e.target.value })
                }
                className="input input-bordered"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <button type="submit" className="btn btn-success text-white">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Profile;
