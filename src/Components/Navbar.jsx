import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Providers/AuthProvider';
import logo from '../assets/logo.png'
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { user, signoutUser } = use(AuthContext);

    const handleLogout = () => {
    signoutUser()
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => console.error(error));
  };


  const navLinks = (
    <>
      <li><NavLink to="/" className="font-semibold">Home</NavLink></li>
      <li><NavLink to="/findpartners" className="font-semibold">Find Partners</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/createprofile" className="font-semibold">Create Profile</NavLink></li>
          <li><NavLink to="/myconnections" className="font-semibold">My Connections</NavLink></li>
        </>
      )}
    </>
  );

    return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className='flex w-10/12 mx-auto'>
        {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <img src={logo} alt="StudyMate Logo" className="w-18 h-18" />
          {/* <span>StudyMate</span> */}
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="user" />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-500" />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="space-x-2">
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm text-white">Register</Link>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Navbar;