import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import useAxios from "../Hooks/useAxios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Register = () => {
  const {setUser, createUser, createUserWithGoogle, updateUser } = use(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
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
      const loggedUser = result.user;

      // Update user profile with name and photo
      await updateUser(loggedUser, {
        displayName: name,
        photoURL: photoURL,
      });

      // Save user info to MongoDB
      const newUser = { name, email, photoURL };
      const res = await axiosInstance.post("/users", newUser);
      if (res.data) {
        setUser(newUser)
        toast.success("Registration successful!");
        // Redirect to previous protected route or home
        navigate(`${location.state ? location.state : "/"}`);
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
      const res = await axiosInstance.post("/users", googleUser);
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
    <div>
      <Navbar></Navbar>
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
              <button
                type="submit"
                className="btn btn-primary text-white w-full"
              >
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
      <Footer></Footer>
    </div>
  );
};

export default Register;


// import React, { useState, use } from "react";
// import { Link, useNavigate, useLocation } from "react-router";
// import { AuthContext } from "../Providers/AuthProvider";

// import { toast, ToastContainer } from "react-toastify";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// import useAxios from "../Hooks/useAxios"; // ✅ Import custom axios hook

// const Register = () => {
//   const { createUser, updateUser, createUserWithGoogle } = use(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const axiosInstance = useAxios(); // ✅ Initialize axios

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     photoURL: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validatePassword = (password) => {
//     const hasUpper = /[A-Z]/.test(password);
//     const hasLower = /[a-z]/.test(password);
//     const minLength = password.length >= 6;

//     if (!hasUpper) {
//       toast.error("Password must contain at least one uppercase letter");
//       return false;
//     }
//     if (!hasLower) {
//       toast.error("Password must contain at least one lowercase letter");
//       return false;
//     }
//     if (!minLength) {
//       toast.error("Password must be at least 6 characters long");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, password, photoURL } = formData;

//     if (!validatePassword(password)) return;

//     try {
//       // ✅ Create Firebase user
//       const result = await createUser(email, password);
//       await updateUser({ displayName: name, photoURL });

//       // ✅ Push user data to MongoDB backend
//       const newUser = { name, email, photoURL };
//       const res = await axiosInstance.post("/users", newUser);
//       if (res.data.insertedId || res.data.acknowledged) {
//         toast.success("User saved to database!");
//       }

//       // ✅ Redirect to previous or home
//       toast.success("Registration successful!");
//       navigate(location.state?.from || "/");
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   const handleSignInGoogle = async () => {
//     try {
//       const result = await createUserWithGoogle();
//       const user = result.user;

//       // ✅ Save Google user to backend
//       const googleUser = {
//         name: user.displayName,
//         email: user.email,
//         photoURL: user.photoURL,
//       };
//       const res = await axiosInstance.post("/users", googleUser);
//       if (res.data.insertedId || res.data.acknowledged) {
//         toast.success("Google sign-up successful!");
//       }

//       navigate(location.state?.from || "/");
//     } catch (error) {
//       console.error(error);
//       toast.error(error.code);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-pink-50">
      
//       <ToastContainer></ToastContainer>
//       <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
//         <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
//           Create Account
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-purple-500 focus:border-purple-500"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-purple-500 focus:border-purple-500"
//             />
//           </div>

//           {/* Photo URL */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Photo URL
//             </label>
//             <input
//               type="text"
//               name="photoURL"
//               value={formData.photoURL}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-purple-500 focus:border-purple-500"
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full rounded-md border border-gray-300 p-2 pr-10 focus:ring-purple-500 focus:border-purple-500"
//             />
//             <span
//               className="absolute top-9 right-3 cursor-pointer text-gray-600"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
//           >
//             Register
//           </button>
//         </form>

//         {/* Google Login */}
//         <div className="mt-4 text-center">
//           <button
//             onClick={handleSignInGoogle}
//             className="btn bg-white text-black border-[#e5e5e5] w-full"
//           >
//             <svg
//               aria-label="Google logo"
//               width="16"
//               height="16"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 512 512"
//             >
//               <g>
//                 <path d="m0 0H512V512H0" fill="#fff"></path>
//                 <path
//                   fill="#34a853"
//                   d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
//                 ></path>
//                 <path
//                   fill="#4285f4"
//                   d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
//                 ></path>
//                 <path
//                   fill="#fbbc02"
//                   d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
//                 ></path>
//                 <path
//                   fill="#ea4335"
//                   d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
//                 ></path>
//               </g>
//             </svg>
//             Login with Google
//           </button>
//         </div>

//         <div className="mt-4 text-center">
//           <p>
//             Already have an account?{" "}
//             <Link
//               to="/auth/login"
//               className="text-purple-600 font-semibold hover:underline"
//             >
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

