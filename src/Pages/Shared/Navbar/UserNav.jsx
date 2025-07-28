import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

const UserNav = () => {
  const { user, logOut } = useAuth();
  const [role, isLoading] = useRole();

  const handleLogout = () => {
    logOut()
      .then(() => {
        // Logout success
      })
      .catch(error => {
        console.error('Logout Error:', error);
      });
  };

  const buttonStyle = 'bg-orange-500 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap transition duration-300';

  return (
    <div className="dropdown dropdown-end">
      {/* Avatar Button */}
      <div tabIndex={0} role="button" className="btn btn-circle avatar">
        <div className="w-10 h-10 border-2 border-slate-200 rounded-full overflow-hidden">
          <img alt="user avatar" src={user?.photoURL} />
        </div>
      </div>

      {/* Dropdown Menu */}
      <ul
        tabIndex={0}
        className="menu menu-sm gap-2 dropdown-content bg-white rounded-box z-[100] mt-3 p-3 shadow-xl border border-gray-100"
      >
        {/* User Name */}
        <li>
          <button className="text-sm font-semibold text-gray-800 cursor-default" disabled>
            {user?.displayName}
          </button>
        </li>

        {/* Role-based Dashboards */}
        {role === 'User' && (
          <li>
            <NavLink to="/dashboard/my-profile" className={buttonStyle}>
              Dashboard
            </NavLink>
          </li>
        )}

        {role === 'DeliveryMen' && (
          <li>
            <NavLink to="/dashboard/my-delivery-list" className={buttonStyle}>
              Dashboard
            </NavLink>
          </li>
        )}

        {role === 'Admin' && (
          <li>
            <NavLink to="/dashboard" className={buttonStyle}>
              Dashboard
            </NavLink>
          </li>
        )}

        {/* Logout */}
        <li>
          <button onClick={handleLogout} className={buttonStyle}>
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserNav;

