import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import * as S from './styles';

const Layout: React.FC = ({ children }) => {
    let location = useLocation();
    const showNavigation = location.pathname !== '/signIn';

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box>
                {showNavigation && <Navigation />}
                <S.Content hideStyles={!showNavigation}>{children}</S.Content>
            </Box>
        </Box>
    );
};

export default Layout;
