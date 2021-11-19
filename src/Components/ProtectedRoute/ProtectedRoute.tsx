import { Navigate } from 'react-router-dom';
import { useUser } from 'src/hooks/useUser';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const {
        userState: { authorization },
    } = useUser();

    if (!authorization?.isAuthorized ) {
        return <Navigate to="/splash-screen" state={{ tokenExipred: true }} />;
    }

    return children;
};

export default ProtectedRoute;
