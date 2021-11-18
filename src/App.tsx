import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import { Container } from './styles';
import Layout from './Components/Layout/Layout';
import VideoDetail from './pages/VideoDetail/VideoDetail';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const App = () => {
    return (
        <Layout>
            <Container>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/video-detail/:id"
                        element={
                            <ProtectedRoute>
                                <VideoDetail />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/signIn" element={<SplashScreen />} />
                </Routes>
            </Container>
        </Layout>
    );
};

export default App;
