import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import { Container } from './styles';
import Layout from './Components/Layout/Layout';
import VideoDetail from './pages/VideoDetail/VideoDetail';
import RequireAuth from './Components/RequireAuth/RequirePath';

const App = () => {
    return (
        <Layout>
            <Container>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <Home />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/video-detail/:id"
                        element={
                            <RequireAuth>
                                <VideoDetail />
                            </RequireAuth>
                        }
                    />
                    <Route path="/signIn" element={<SplashScreen />} />
                </Routes>
            </Container>
        </Layout>
    );
};

export default App;
