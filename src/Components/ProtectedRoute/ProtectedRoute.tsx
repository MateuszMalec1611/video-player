import { Navigate } from 'react-router-dom';
import { useUser } from 'src/hooks/useUser';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const {
        userState: { authorization },
    } = useUser();

    const auth = authorization?.isAuthorized;

    if (!auth) {
        return <Navigate to="/splash-screen" />;
    }

    return children;
};

export default ProtectedRoute;
