import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import { Container } from './styles';
import { useUser } from './hooks/useUser';

const App = () => {
    const {
        userState: {
            authorizationToken: { Token },
        },
    } = useUser();

    return (
        <Container>
            <Routes>
                <Route path="/" element={Token ? <Home /> : <Navigate to="/signIn" />} />
                <Route path="/signIn" element={<SplashScreen />} />
            </Routes>
        </Container>
    );
};

export default App;
