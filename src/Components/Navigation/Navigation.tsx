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
                <S.LinksBox notActive={!isActive}>
                    <S.LinksWrapper>
                        <S.Link onClick={handleMenu} to="/">
                            List 1
                        </S.Link>
                        <S.Link onClick={handleMenu} to="/list2">
                            List 2
                        </S.Link>
                    </S.LinksWrapper>
                </S.LinksBox>
            </Toolbar>
        </S.NavigationBar>
    );
};

export default Navigation;
