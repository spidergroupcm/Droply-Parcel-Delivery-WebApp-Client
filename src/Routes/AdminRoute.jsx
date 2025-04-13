import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [role, isPending] = useRole()
    const location = useLocation()
    if (loading || isPending) {
        return <progress className='progress w-64'></progress>
    }
    if (user && role === 'Admin') {
        return children
    }
    return <Navigate to='/' state={{ from: location }}></Navigate>
};

export default AdminRoute;