import { Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen/SplashScreen';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
            </Routes>
        </div>
    );
};

export default App;
