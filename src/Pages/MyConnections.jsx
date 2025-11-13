import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MyConnections = () => {
  const { user } = use(AuthContext);
  const axiosInstance = useAxios();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingConnection, setEditingConnection] = useState(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axiosInstance.get(`/connections/${user?.email}`);
        setConnections(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load connections!");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchConnections();
  }, [user, axiosInstance]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This connection will be removed permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosInstance.delete(`/connections/${id}`);
          if (res.data.deletedCount > 0) {
            setConnections(connections.filter((item) => item._id !== id));
            Swal.fire(
              "Deleted!",
              "Your connection has been deleted.",
              "success"
            );
          }
        } catch (err) {
          console.error(err);
          toast.error("Failed to delete connection!");
        }
      }
    });
  };

  // ✅ Handle update form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      partnerSubject: form.subject.value,
      partnerStudyMode: form.studyMode.value,
      partnerExpLevel: form.experienceLevel.value,
    };

    try {
      const res = await axiosInstance.put(
        `/connections/${editingConnection._id}`,
        updatedData
      );
      if (res.data.modifiedCount > 0) {
        toast.success("Connection updated successfully!");
        setConnections(
          connections.map((conn) =>
            conn._id === editingConnection._id
              ? { ...conn, ...updatedData }
              : conn
          )
        );
        setEditingConnection(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update connection!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  return (
    <div>
      <Navbar></Navbar>
      <div className="p-6 bg-base-200 min-h-screen">
        <ToastContainer />
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          My Connections
        </h2>

        {connections.length === 0 ? (
          <p className="text-center text-gray-500">No connections found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Subject</th>
                  <th>Study Mode</th>
                  <th>Experience Level</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {connections.map((conn) => (
                  <tr key={conn._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <img src={conn.partnerPhoto} alt={conn.name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{conn.partnerName}</div>
                        </div>
                      </div>
                    </td>
                    <td>{conn.partnerSubject}</td>
                    <td>{conn.partnerStudyMode}</td>
                    <td>{conn.partnerExpLevel}</td>
                    <td>
                      <button
                        onClick={() => setEditingConnection(conn)}
                        className="btn btn-sm btn-info text-white mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(conn._id)}
                        className="btn btn-sm btn-error text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Update Modal */}
        {editingConnection && (
          <dialog id="updateModal" open className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Update Connection</h3>
              <form onSubmit={handleUpdate} className="space-y-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Subject</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    defaultValue={editingConnection.partnerSubject}
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Study Mode</span>
                  </label>
                  <select
                    name="studyMode"
                    defaultValue={editingConnection.studyMode}
                    className="select select-bordered"
                    required
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Experience Level</span>
                  </label>
                  <select
                    name="experienceLevel"
                    defaultValue={editingConnection.experienceLevel}
                    className="select select-bordered"
                    required
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div className="modal-action">
                  <button type="submit" className="btn btn-primary text-white">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingConnection(null)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MyConnections;
