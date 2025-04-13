import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

const UserNav = () => {
    const { user, logOut } = useAuth()
    const [role, isLoading] = useRole()

    const handleLogout = () => {
        logOut()
            .then(() => {
                // console.log('successfully Logout')
            })
            .catch(error => {
                // console.log('Error by Logout ', error)
            })
    }

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 h-10 border-2 border-slate-100 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src={user?.photoURL} />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm gap-2 dropdown-content bg-black/50 backdrop-blur-lg  rounded-box z-[1] mt-3 p-2 shadow">
                <li>
                    <button 
                    className="bg-black/5 whitespace-nowrap hover:bg-gray-900" disabled={true}>{user?.displayName}</button>
                </li>
                {/* for user */}
                {role === 'User' &&

                    <li>
                        <NavLink to='/dashboard/my-profile' 
                        className='bg-black/5 whitespace-nowrap hover:bg-gray-900'>
                            Dashboard
                        </NavLink>
                    </li>
                }

                {/* for Delivery Man */}
                {
                    role === 'DeliveryMen' &&
                    <>
                        <li>
                            <NavLink to='/dashboard/my-delivery-list' className='bg-black/5 whitespace-nowrap hover:bg-gray-800'>
                                Dashboard
                            </NavLink>
                        </li>
                    </>
                }

                {/* for Admin */}

                {
                    role === 'Admin' &&
                    <>
                        <li>
                            <NavLink to='/dashboard' className='bg-black/5 whitespace-nowrap hover:bg-gray-900'>
                                Dashboard
                            </NavLink>
                        </li>
                    </>
                }
                <li>
                    <button onClick={handleLogout} className="bg-black/5 whitespace-nowrap hover:bg-gray-900">
                        Log Out
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default UserNav;