import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BiSolidBookAlt } from 'react-icons/bi';
import { MdOutlineContactSupport } from 'react-icons/md';
import useAuth from '../../../hooks/useAuth';
import UserNav from './UserNav';
import logo5 from '../../../assets/logo.png';

const Navbar = () => {
  const { user } = useAuth();

  const navButtonClass = (isActive) =>
    `text-2xl p-2 rounded-full transition-all duration-300 ${
      isActive ? 'bg-green-500 text-white scale-110 shadow-lg' : 'bg-orange-500 text-white hover:bg-green-500'
    }`;

  return (
    <nav className="navbar bg-white shadow-lg w-full px-4 md:px-8 py-2 flex justify-between items-center sticky top-0 z-50 border-b-2 border-b-orange-600">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center">
          <img className="w-10" src={logo5} alt="Droply Logo" />
          <span className="text-2xl font-bold text-orange-600 ml-2">Droply</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-2">
        <NavLink to="/" className={({ isActive }) => navButtonClass(isActive)} title="Home">
          <AiOutlineHome />
        </NavLink>
        <NavLink to="/blog" className={({ isActive }) => navButtonClass(isActive)} title="Blog">
          <BiSolidBookAlt />
        </NavLink>
        <NavLink to="/support" className={({ isActive }) => navButtonClass(isActive)} title="Contact">
          <MdOutlineContactSupport />
        </NavLink>
      </div>

      {/* Auth Section */}
      <div>
        {user ? (
          <UserNav />
        ) : (
          <Link to="/signIn">
            <button className="btn bg-orange-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-lg transition">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
