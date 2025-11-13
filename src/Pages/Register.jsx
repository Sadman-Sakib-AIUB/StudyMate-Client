import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import useAxios from "../Hooks/useAxios";

const Register = () => {
  const { createUser, createUserWithGoogle } = use(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photo.value;
    const password = form.password.value;

    // Password validation
    if (!/(?=.*[A-Z])/.test(password)) {
      return setError("Password must contain at least one uppercase letter.");
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return setError("Password must contain at least one lowercase letter.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    try {
      // Create user in Firebase
      const result = await createUser(email, password);
      console.log(result);
      
      // Save user info to MongoDB
      const newUser = { name, email, photoURL };
      const res = await axiosInstance.post("/users", newUser)
        if (res.data.insertedId) {
          toast.success("Registration successful!");
          navigate("/");
        }
    
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Try again!");
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const result = await createUserWithGoogle();
      const user = result.user;

      // Save Google user to MongoDB
      const googleUser = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      const res = await axiosInstance.post("/users", googleUser)
        if (res.data.insertedId) {
          toast.success("Google Sign-Up successful!");
          navigate("/");
        }
      
    } catch (err) {
      console.error(err);
      toast.error("Google Sign-Up failed!");
    }
  };

  return (
    <div className="py-10 bg-base-200 flex  justify-center items-center">
        <ToastContainer></ToastContainer>
      <div className="card w-full max-w-md shadow-lg bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Register Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="input input-bordered"
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="input input-bordered"
            />
          </div>

          {/* Photo URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Profile Photo URL"
              required
              className="input input-bordered"
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              className="input input-bordered"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit */}
          <div className="form-control mt-4">
            <button type="submit" className="btn btn-primary text-white w-full">
              Register
            </button>
          </div>
        </form>

        <div className="divider">OR</div>

        {/* Google Sign Up */}
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
