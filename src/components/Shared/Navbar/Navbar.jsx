import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link, NavLink } from 'react-router'; 
import Logo from '../../Logo/Logo';
import Button from '../Button/Button';

const Navbar = () => {
    // Destructure user and logOut function from the hook
    const { user, logOut } = useAuth() || {};

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log("User logged out successfully");
            })
            .catch(error => {
                console.error("Logout error:", error);
            });
    };
    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/all-scholarships">All Scholarships</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                {/* Mobile/Hamburger Menu */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                        {/* Mobile Dashboard and Logout link for logged-in user */}
                        {user && (
                            <>
                                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                                <li><Button onClick={handleLogOut}>Log Out</Button></li>
                            </>
                        )}
                        {/* Mobile Login link for logged-out user */}
                        {!user && (
                            <li><Link to="/login">Login</Link></li>
                        )}
                    </ul>
                </div>
                {/* Logo Section */}
                <span className="btn btn-ghost text-xl">
                    <Logo />
                </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                    {/* Desktop Dashboard Link - shown only if logged in */}
                    {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
                </ul>
            </div>

            {/* User Profile/Login Section */}
            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full border border-amber-300">
                                {/* User profile image, use a fallback if user.photoURL is null */}
                                <img 
                                    alt={user.displayName} 
                                    src={user.photoURL} 
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                {/* Show User Name/Email for context */}
                                <span className="justify-between font-bold text-gray-700">
                                    {user.displayName || user.email || 'User Profile'}
                                </span>
                            </li>
                            {/* Dashboard Link in Dropdown - You might want to keep this only on the main nav or here, not both */}
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            
                            {/* Log Out Button */}
                            <li><Button onClick={handleLogOut}>Logout</Button></li>
                        </ul>
                    </div>
                    // --- END: Profile Image with Dropdown ---
                ) : (
                    // Login Button (for Logged-out User)
                    <Link className='btn' to="/login">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;


