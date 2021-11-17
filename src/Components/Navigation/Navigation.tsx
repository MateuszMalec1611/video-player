import { useState } from 'react';
import { Toolbar } from '@mui/material';
import { useNavigate } from 'react-router';
import Hamburger from '../Hamburger/Hamburger';
import * as S from './styles';

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);

    const handleMenu = () => setIsActive(!isActive);
    const handleRedirect = () => navigate('/', { replace: false });

    return (
        <S.NavigationBar>
            <Toolbar variant="dense">
                <S.Title onClick={handleRedirect}>video player</S.Title>
                <Hamburger notActive={!isActive} handleMenu={handleMenu} />
            </Toolbar>
            <S.LinksBox notActive={!isActive}>
                <S.LinksWrapper>
                    <S.Link onClick={handleMenu} to="/">
                        Home
                    </S.Link>
                    <S.Link onClick={handleMenu} to="/list2">
                        Another category
                    </S.Link>
                </S.LinksWrapper>
            </S.LinksBox>
        </S.NavigationBar>
    );
};

export default Navigation;
