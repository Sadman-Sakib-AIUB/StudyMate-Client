import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import useAxios from "../Hooks/useAxios";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Login = () => {
  const { signinUser, createUserWithGoogle } = use(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signinUser(email, password);
      const user = result.user;

      // Check if user exists in MongoDB (insert if missing)
      const existing = await axiosInstance.get(`/users/${user.email}`);
      if (!existing.data) {
        await axiosInstance.post("/users", {
          name: user.displayName || "User",
          email: user.email,
          photoURL: user.photoURL || "",
        });
      }

      toast.success("Login successful!");
      navigate(`${location.state ? location.state : "/"}`)
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
      toast.error("Login failed. Please try again!");
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await createUserWithGoogle();
      const user = result.user;

      // Save user to MongoDB if new
      await axiosInstance.post("/users", {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      toast.success("Google login successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Google login failed!");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="py-10 bg-base-200 flex justify-center items-center">
        <ToastContainer />
        <div className="card w-full max-w-md shadow-lg bg-base-100 p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                required
                className="input input-bordered"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit */}
            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn btn-primary text-white w-full"
              >
                Login
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 underline">
              Register
            </Link>
          </p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;




