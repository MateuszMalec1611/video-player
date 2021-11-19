import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import { Container } from './styles';
import Layout from './Components/Layout/Layout';
import VideoDetail from './pages/VideoDetail/VideoDetail';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { VideosListId } from './store/Viedos/Videos.types';
import Auth from './pages/Auth/Auth';

const App = () => {
    return (
        <Layout>
            <Container>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home listId={VideosListId.HOME} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/list2"
                        element={
                            <ProtectedRoute>
                                <Home listId={VideosListId.LIST2} />
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
                    <Route path="/splash-screen" element={<SplashScreen />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </Container>
        </Layout>
    );
};

export default App;
