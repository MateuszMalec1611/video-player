import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Toolbar } from '@mui/material';
import Hamburger from '../Hamburger/Hamburger';
import { useUser } from 'src/hooks/useUser';
import { UserActionTypes } from 'src/store/User/User.types';
import * as S from './styles';

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const { userIsAnonymous, userDispatch } = useUser();

    const handleMenu = () => setIsActive(!isActive);
    const handleLogout = () => {
        setIsActive(!isActive);
        userDispatch({
            type: UserActionTypes.SET_USER,
            payload: {
                user: undefined,
                authorization: undefined,
            },
        });
    };

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
                        <S.Link
                            onClick={userIsAnonymous ? handleMenu : handleLogout}
                            to={userIsAnonymous ? '/auth' : '/splash-screen'}>
                            {userIsAnonymous ? 'Login' : 'Logout'}
                        </S.Link>
                    </S.LinksWrapper>
                </S.LinksBox>
            </Toolbar>
        </S.NavigationBar>
    );
};

export default Navigation;
