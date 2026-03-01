import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Logo from "../../Logo/Logo";
import Button from "../Button/Button";
import { FaChevronDown, FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth() || {};
  const [blogOpen, setBlogOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Page load এ localStorage থেকে theme apply করা
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  // Manual dark/light toggle
  const handleThemeToggle = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const blogItems = [
    { name: "Featured Articles", link: "/blog?category=featured" },
    { name: "Guidelines & Tips", link: "/blog?category=tips" },
  ];

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("User logged out"))
      .catch((err) => console.error("Logout error:", err));
  };

  const handleItemClick = () => setBlogOpen(false);

  return (
    <div className="navbar bg-base-100 dark:bg-gray-900 shadow-md px-4 lg:px-10 sticky top-0 z-50 transition-colors duration-300">

      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-gray-800 rounded-box w-52 z-50">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/all-scholarships">All Scholarships</NavLink></li>
            <li>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setBlogOpen(!blogOpen)}>
                <span>Blog</span>
                <FaChevronDown className={`ml-2 transition-transform ${blogOpen ? "rotate-180" : ""}`} />
              </div>
              {blogOpen && (
                <ul className="p-2 bg-base-100 dark:bg-gray-800 shadow rounded-box mt-2">
                  {blogItems.map((item, idx) => (
                    <li key={idx}><Link to={item.link} onClick={handleItemClick}>{item.name}</Link></li>
                  ))}
                </ul>
              )}
            </li>
            <li><NavLink to="/about">About</NavLink></li>
            {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
            {user && (
              <li>
                <Button onClick={handleLogOut} className="w-full text-left py-2 px-4 hover:bg-base-200">Logout</Button>
              </li>
            )}
            {!user && <li><NavLink to="/login">Login</NavLink></li>}
            {!user && <li><NavLink to="/register">Register</NavLink></li>}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          <Logo />
        </Link>
      </div>

      {/* CENTER DESKTOP */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 items-center gap-2">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/all-scholarships">All Scholarships</NavLink></li>
          <li className="relative">
            <div role="button" className="flex items-center cursor-pointer px-4 py-2" onClick={() => setBlogOpen(!blogOpen)}>
              <span>Blog</span>
              <FaChevronDown className={`ml-1 transition-transform ${blogOpen ? "rotate-180" : ""}`} />
            </div>
            {blogOpen && (
              <ul className="absolute left-0 top-full mt-2 p-2 bg-base-100 dark:bg-gray-800 shadow rounded-box min-w-[200px] z-50">
                {blogItems.map((item, idx) => (
                  <li key={idx}><Link to={item.link} onClick={handleItemClick}>{item.name}</Link></li>
                ))}
              </ul>
            )}
          </li>
          <li><NavLink to="/about">About</NavLink></li>
          {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end flex items-center gap-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={handleThemeToggle}
          className="ml-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border border-primary">
                <img alt={user?.displayName} src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-gray-800 rounded-box w-52 z-50">
              <li className="font-semibold px-4 py-2">{user?.displayName || user?.email}</li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li>
                <Button onClick={handleLogOut} className="w-full text-left py-2 px-4 hover:bg-pink-600-200 text-red-500">Logout</Button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link className="btn btn-outline btn-secondary btn-sm md:btn-md" to="/login">Login</Link>
            <Link className="btn btn-outline btn-secondary btn-sm md:btn-md" to="/register">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;