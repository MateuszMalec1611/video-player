import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import { Container } from './styles';
import { useUser } from './hooks/useUser';
import Layout from './Components/Layout/Layout';

const App = () => {
    const {
        userState: { authorization },
    } = useUser();

    const auth = authorization?.isAuthorized;

    return (
        <Layout>
            <Container>
                <Routes>
                    <Route path="/" element={auth ? <Home /> : <Navigate to="/signIn" />} />
                    <Route
                        path="/video-detail"
                        element={auth ? <Home /> : <Navigate to="/signIn" />}
                    />
                    <Route path="/signIn" element={<SplashScreen />} />
                </Routes>
            </Container>
        </Layout>
    );
};

export default App;
