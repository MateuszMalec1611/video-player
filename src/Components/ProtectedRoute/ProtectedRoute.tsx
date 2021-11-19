import { Navigate } from 'react-router-dom';
import { useUser } from 'src/hooks/useUser';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const {
        userState: { authorization },
    } = useUser();

    // console.log(new Date(authorization?.TokenExpires!).getTime());

    const tokenExipred =
        new Date().getTime() > Number(new Date(authorization?.TokenExpires!).getTime());

    if (!authorization?.isAuthorized || tokenExipred) {
        return <Navigate to="/splash-screen" state={{ tokenExipred: true }} />;
    }

    return children;
};

export default ProtectedRoute;
