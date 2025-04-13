import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link, NavLink } from 'react-router-dom';
import UserNav from './UserNav';
import logo5 from '../../../assets/logo.png';


const Navbar = () => {
    const { user } = useAuth();

    return (
        <div className="navbar w-full text-white">
            <div className="flex-1">
                <Link className="flex justify-center items-center text-xl p-0 text-[#E54530] font-bold">
                    <img className="w-8 md:w-10 mr-2" src={logo5} alt="logo" />
                    <span className="md:font-bold text-md md:text-2xl  inline text-orange-600">Droply</span>
                </Link>
            </div>
            <div className="flex-none">
                <div className="flex items-center gap-2 px-2">
                    <NavLink 
                        to='/' 
                        className={({ isActive }) => 
                            `btn text-white font-semibold rounded-lg transition duration-300 ${isActive ? 'bg-green-500' : 'bg-orange-500'}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to='/blog' 
                        className={({ isActive }) => 
                            `btn text-white font-semibold rounded-lg transition duration-300 ${isActive ? 'bg-green-500' : 'bg-orange-500'}`
                        }
                    >
                        Blog
                    </NavLink>
                    
                    <NavLink 
                        to='/support' 
                        className={({ isActive }) => 
                            `btn text-white font-semibold rounded-lg transition duration-300 ${isActive ? 'bg-green-500' : 'bg-orange-500'}`
                        }
                    >
                        Contact
                    </NavLink>
                </div>
                {
                    user ? <UserNav /> : (
                        <Link to='/signIn'>
                            <button className="btn bg-orange-600 hover:bg-green-500 text-white font-bold">
                                Sign In
                            </button>
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;


