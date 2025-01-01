import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

const AdminRoute = ({ children }) => {
    const { currentUser, userRole, loading } = useAuth();

    if (loading) {
        return  <Loading/>;
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (userRole !== 'admin') {
        return <Navigate to="/" />;
    }

    return children ? children : <Outlet/>;
};

export default AdminRoute;